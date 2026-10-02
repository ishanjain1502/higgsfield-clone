#!/usr/bin/env python3
"""Append prompt/response pairs to .agent-logs/ via Cursor lifecycle hooks."""

from __future__ import annotations

import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[2]
LOGS_DIR = PROJECT_ROOT / ".agent-logs"
STATE_PATH = LOGS_DIR / ".capture-state.json"

AUTHOR = os.environ.get("AGENT_LOG_AUTHOR", "ishan")
PROJECT = os.environ.get("AGENT_LOG_PROJECT", PROJECT_ROOT.name)
TOOL = "cursor"


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def iso_z(dt: datetime) -> str:
    ms = dt.microsecond // 1000
    return dt.strftime("%Y-%m-%dT%H:%M:%S.") + f"{ms:03d}Z"


def file_stamp(dt: datetime) -> str:
    return dt.strftime("%Y-%m-%d_%H-%M-%S")


def session_short(session_id: str) -> str:
    return session_id.split("-")[0] if session_id else "unknown"


def load_state() -> dict:
    if not STATE_PATH.exists():
        return {"sessions": {}}
    try:
        return json.loads(STATE_PATH.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return {"sessions": {}}


def save_state(state: dict) -> None:
    LOGS_DIR.mkdir(parents=True, exist_ok=True)
    STATE_PATH.write_text(json.dumps(state, indent=2), encoding="utf-8")


def model_name(payload: dict) -> str:
    return payload.get("model_id") or payload.get("model") or "unknown"


def conversation_key(payload: dict) -> str:
    return (
        payload.get("conversation_id")
        or payload.get("session_id")
        or "unknown-conversation"
    )


def log_path_for_session(session_id: str, started: datetime) -> Path:
    safe_id = re.sub(r"[^\w\-]", "_", session_id)
    return LOGS_DIR / f"{file_stamp(started)}_{safe_id}.md"


def build_header(meta: dict) -> str:
    return (
        "---\n"
        f"session_id: {meta['session_id']}\n"
        f"date: {meta['date']}\n"
        f"author: {AUTHOR}\n"
        f"model: {meta['model']}\n"
        f"tool: {TOOL}\n"
        f"project: {PROJECT}\n"
        f"total_exchanges: {meta['total_exchanges']}\n"
        f"first_prompt_time: {meta['first_prompt_time']}\n"
        f"last_prompt_time: {meta['last_prompt_time']}\n"
        "---\n\n"
        f"# Session Log - {meta['date']}\n\n"
        f"Session: `{session_short(meta['session_id'])}` | "
        f"Project: `{PROJECT}` | Author: `{AUTHOR}`\n\n"
        "---\n\n"
    )


def extract_entries(content: str) -> str:
    idx = content.find("[LOG_ENTRY")
    if idx == -1:
        return ""
    return content[idx:]


def refresh_frontmatter(log_file: Path, meta: dict) -> None:
    if not log_file.exists():
        return
    content = log_file.read_text(encoding="utf-8")
    entries = extract_entries(content)
    log_file.write_text(build_header(meta) + entries, encoding="utf-8")


def ensure_session(state: dict, payload: dict) -> dict:
    key = conversation_key(payload)
    sessions = state.setdefault("sessions", {})
    if key not in sessions:
        now = utc_now()
        sid = payload.get("session_id") or key
        log_file = log_path_for_session(sid, now)
        sessions[key] = {
            "session_id": sid,
            "log_file": str(log_file),
            "started_at": iso_z(now),
            "exchange_num": 0,
            "pending_prompt_num": None,
            "first_prompt_time": None,
            "last_prompt_time": None,
            "last_model": model_name(payload),
            "prompt_count": 0,
            "response_count": 0,
        }
        LOGS_DIR.mkdir(parents=True, exist_ok=True)
        meta = {
            "session_id": sid,
            "date": now.strftime("%Y-%m-%d"),
            "model": sessions[key]["last_model"],
            "total_exchanges": 0,
            "first_prompt_time": None,
            "last_prompt_time": None,
        }
        log_file.write_text(build_header(meta), encoding="utf-8")
    return sessions[key]


def append_block(
    log_file: Path,
    entry_type: str,
    num: int,
    sid: str,
    timestamp: str,
    model: str,
    body: str,
) -> None:
    block = (
        f"[LOG_ENTRY type={entry_type} num={num} session={session_short(sid)}]\n"
        f"timestamp: {timestamp}\n"
        f"model: {model}\n\n"
        f"{body.rstrip()}\n\n"
    )
    with log_file.open("a", encoding="utf-8") as f:
        f.write(block)


def sync_meta(session: dict) -> dict:
    return {
        "session_id": session["session_id"],
        "date": session["started_at"][:10],
        "model": session["last_model"],
        "total_exchanges": session["response_count"],
        "first_prompt_time": session["first_prompt_time"] or session["started_at"],
        "last_prompt_time": session["last_prompt_time"]
        or session["first_prompt_time"]
        or session["started_at"],
    }


def handle_session_start(state: dict, payload: dict) -> None:
    ensure_session(state, payload)


def handle_prompt(state: dict, payload: dict) -> None:
    session = ensure_session(state, payload)
    session["exchange_num"] += 1
    num = session["exchange_num"]
    session["pending_prompt_num"] = num
    session["prompt_count"] += 1
    now = iso_z(utc_now())
    session["last_model"] = model_name(payload)
    if not session["first_prompt_time"]:
        session["first_prompt_time"] = now
    session["last_prompt_time"] = now

    prompt = payload.get("prompt") or ""
    log_file = Path(session["log_file"])
    append_block(
        log_file,
        "PROMPT",
        num,
        session["session_id"],
        now,
        session["last_model"],
        prompt,
    )
    refresh_frontmatter(log_file, sync_meta(session))


def handle_response(state: dict, payload: dict) -> None:
    session = ensure_session(state, payload)
    num = session.get("pending_prompt_num") or session["exchange_num"]
    if num == 0:
        session["exchange_num"] = 1
        num = 1
    session["response_count"] += 1
    session["pending_prompt_num"] = None
    now = iso_z(utc_now())
    session["last_model"] = model_name(payload)

    text = payload.get("text") or ""
    log_file = Path(session["log_file"])
    append_block(
        log_file,
        "RESPONSE",
        num,
        session["session_id"],
        now,
        session["last_model"],
        text,
    )
    refresh_frontmatter(log_file, sync_meta(session))


def handle_session_end(state: dict, payload: dict) -> None:
    key = conversation_key(payload)
    sessions = state.get("sessions", {})
    session = sessions.get(key)
    if not session:
        return
    log_file = Path(session["log_file"])
    refresh_frontmatter(log_file, sync_meta(session))


def repair_invalid_json_escapes(raw: str) -> str:
    return re.sub(r'\\(?!["\\/bfnrtu]|u[0-9a-fA-F]{4})', r"\\\\", raw)


def parse_hook_payload(raw: str) -> dict | None:
    text = raw.lstrip("\ufeff").strip()
    if not text:
        return {}
    for candidate in (text, repair_invalid_json_escapes(text)):
        try:
            return json.loads(candidate)
        except json.JSONDecodeError:
            continue
    return None


def configure_stdio_utf8() -> None:
    for stream in (sys.stdin, sys.stdout):
        reconfigure = getattr(stream, "reconfigure", None)
        if reconfigure:
            try:
                reconfigure(encoding="utf-8")
            except (OSError, ValueError):
                pass


def hook_witness(event: str, detail: str = "") -> None:
    try:
        LOGS_DIR.mkdir(parents=True, exist_ok=True)
        line = f"{iso_z(utc_now())} python event={event} {detail}".strip()
        with (LOGS_DIR / ".hook-invocations.log").open("a", encoding="utf-8") as f:
            f.write(line + "\n")
    except OSError:
        pass


def main() -> int:
    configure_stdio_utf8()
    raw = sys.stdin.read()
    payload = parse_hook_payload(raw)
    if payload is None:
        hook_witness("parse-error", f"bytes={len(raw)}")
        print(json.dumps({"continue": True}))
        return 0

    event = payload.get("hook_event_name", "")
    hook_witness(event or "unknown")
    state = load_state()

    if event == "sessionStart":
        handle_session_start(state, payload)
    elif event == "beforeSubmitPrompt":
        handle_prompt(state, payload)
    elif event == "afterAgentResponse":
        handle_response(state, payload)
    elif event == "sessionEnd":
        handle_session_end(state, payload)

    save_state(state)

    if event == "beforeSubmitPrompt":
        print(json.dumps({"continue": True}))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
