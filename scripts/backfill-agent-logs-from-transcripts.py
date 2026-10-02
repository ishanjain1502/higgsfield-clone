#!/usr/bin/env python3
"""
One-time backfill: Cursor agent-transcripts/*.jsonl -> .agent-logs/*.md

Hooks only capture new turns. This extracts user prompts and the final assistant
text per turn (same as afterAgentResponse), not tool calls or thinking.
"""

from __future__ import annotations

import json
import os
import re
import subprocess
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
LOGS_DIR = REPO_ROOT / ".agent-logs"
DEFAULT_TRANSCRIPTS = Path.home() / ".cursor/projects/e-Projects-8x-assignment/agent-transcripts"

AUTHOR = os.environ.get("AGENT_LOG_AUTHOR", "")
PROJECT = os.environ.get("AGENT_LOG_PROJECT", REPO_ROOT.name)
TOOL = "cursor"
MODEL = os.environ.get("AGENT_LOG_MODEL", "composer-2.5")


def git_author() -> str:
    if AUTHOR:
        return AUTHOR
    try:
        out = subprocess.check_output(
            ["git", "config", "user.name"],
            cwd=REPO_ROOT,
            text=True,
            stderr=subprocess.DEVNULL,
        ).strip()
        if out:
            return out
    except (subprocess.CalledProcessError, FileNotFoundError):
        pass
    return "ishan"


def session_short(session_id: str) -> str:
    return session_id.split("-")[0] if session_id else "unknown"


def iso_z(dt: datetime) -> str:
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    dt = dt.astimezone(timezone.utc)
    ms = dt.microsecond // 1000
    return dt.strftime("%Y-%m-%dT%H:%M:%S.") + f"{ms:03d}Z"


def file_stamp(dt: datetime) -> str:
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    dt = dt.astimezone(timezone.utc)
    return dt.strftime("%Y-%m-%d_%H-%M-%S")


def parse_prompt_timestamp(raw: str) -> datetime | None:
    m = re.search(r"<timestamp>\s*(.*?)\s*</timestamp>", raw, re.DOTALL)
    if not m:
        return None
    label = m.group(1).strip()
    label = re.sub(r"^[A-Za-z]+,\s*", "", label)
    tz_match = re.search(r"\(UTC([+-]\d+(?::\d+)?)\)\s*$", label)
    offset_min = 0
    if tz_match:
        label = label[: tz_match.start()].strip()
        sign = 1
        part = tz_match.group(1)
        if part.startswith("-"):
            sign = -1
            part = part[1:]
        elif part.startswith("+"):
            part = part[1:]
        if ":" in part:
            h, mn = part.split(":", 1)
            offset_min = sign * (int(h) * 60 + int(mn))
        else:
            offset_min = sign * int(part) * 60
    for fmt in ("%b %d, %Y, %I:%M %p", "%b %d, %Y, %H:%M"):
        try:
            naive = datetime.strptime(label, fmt)
            tz = timezone(timedelta(minutes=offset_min))
            return naive.replace(tzinfo=tz)
        except ValueError:
            continue
    return None


def extract_user_prompt(raw: str) -> str:
    m = re.search(r"<user_query>\s*(.*?)\s*</user_query>", raw, re.DOTALL)
    if m:
        return m.group(1)
    return raw


def extract_assistant_text(message: dict) -> str:
    parts: list[str] = []
    for block in message.get("content") or []:
        if block.get("type") != "text":
            continue
        text = (block.get("text") or "").strip()
        text = re.sub(r"\n?\[REDACTED\]\s*$", "", text).strip()
        if text:
            parts.append(text)
    return "\n\n".join(parts)


def iter_turns(records: list[dict]) -> list[tuple[str, datetime | None, str]]:
    turns: list[tuple[str, datetime | None, str]] = []
    prompt: str | None = None
    prompt_ts: datetime | None = None
    assistant_chunks: list[str] = []

    def flush() -> None:
        nonlocal prompt, prompt_ts, assistant_chunks
        if prompt is None:
            assistant_chunks = []
            return
        response = ""
        for chunk in reversed(assistant_chunks):
            if chunk.strip():
                response = chunk
                break
        turns.append((prompt, prompt_ts, response))
        prompt = None
        prompt_ts = None
        assistant_chunks = []

    for row in records:
        if row.get("type") == "turn_ended":
            flush()
            continue
        role = row.get("role")
        if role == "user":
            flush()
            raw = ""
            content = row.get("message", {}).get("content") or []
            for block in content:
                if block.get("type") == "text":
                    raw = block.get("text") or ""
                    break
            prompt_ts = parse_prompt_timestamp(raw)
            prompt = extract_user_prompt(raw)
        elif role == "assistant":
            text = extract_assistant_text(row.get("message") or {})
            assistant_chunks.append(text)

    if prompt is not None:
        flush()

    return turns


def build_header(meta: dict, author: str) -> str:
    return (
        "---\n"
        f"session_id: {meta['session_id']}\n"
        f"date: {meta['date']}\n"
        f"author: {author}\n"
        f"model: {meta['model']}\n"
        f"tool: {TOOL}\n"
        f"project: {PROJECT}\n"
        f"total_exchanges: {meta['total_exchanges']}\n"
        f"first_prompt_time: {meta['first_prompt_time']}\n"
        f"last_prompt_time: {meta['last_prompt_time']}\n"
        "---\n\n"
        f"# Session Log - {meta['date']}\n\n"
        f"Session: `{session_short(meta['session_id'])}` | "
        f"Project: `{PROJECT}` | Author: `{author}`\n\n"
        "---\n\n"
    )


def log_entry(
    entry_type: str,
    num: int,
    session_id: str,
    timestamp: str,
    model: str,
    body: str,
) -> str:
    return (
        f"[LOG_ENTRY type={entry_type} num={num} session={session_short(session_id)}]\n"
        f"timestamp: {timestamp}\n"
        f"model: {model}\n\n"
        f"{body.rstrip()}\n\n"
    )


def existing_session_ids() -> set[str]:
    ids: set[str] = set()
    if not LOGS_DIR.exists():
        return ids
    for path in LOGS_DIR.glob("*.md"):
        text = path.read_text(encoding="utf-8", errors="replace")
        m = re.search(r"^session_id:\s*(.+)$", text, re.MULTILINE)
        if m:
            ids.add(m.group(1).strip())
    return ids


def backfill_session(session_id: str, jsonl_path: Path, author: str, force: bool) -> Path | None:
    skip = existing_session_ids()
    if not force and session_id in skip:
        print(f"skip {session_id[:8]} (log already exists)")
        return None

    records = [
        json.loads(line)
        for line in jsonl_path.read_text(encoding="utf-8").splitlines()
        if line.strip()
    ]
    turns = iter_turns(records)
    if not turns:
        print(f"skip {session_id[:8]} (no turns)")
        return None

    first_ts = next((t for _, t, _ in turns if t), None)
    if first_ts is None:
        first_ts = datetime.fromtimestamp(jsonl_path.stat().st_mtime, tz=timezone.utc)

    safe_id = re.sub(r"[^\w\-]", "_", session_id)
    out_path = LOGS_DIR / f"{file_stamp(first_ts)}_{safe_id}.md"

    entries: list[str] = []
    first_prompt_iso = None
    last_prompt_iso = None
    for i, (prompt, pts, response) in enumerate(turns, start=1):
        prompt_iso = iso_z(pts) if pts else iso_z(first_ts + timedelta(seconds=i * 2))
        response_iso = iso_z((pts + timedelta(seconds=90)) if pts else first_ts + timedelta(seconds=i * 2 + 1))
        if first_prompt_iso is None:
            first_prompt_iso = prompt_iso
        last_prompt_iso = prompt_iso
        entries.append(
            log_entry("PROMPT", i, session_id, prompt_iso, MODEL, prompt)
        )
        if response.strip():
            entries.append(
                log_entry("RESPONSE", i, session_id, response_iso, MODEL, response)
            )

    meta = {
        "session_id": session_id,
        "date": first_ts.astimezone(timezone.utc).strftime("%Y-%m-%d"),
        "model": MODEL,
        "total_exchanges": sum(1 for _, _, r in turns if r.strip()),
        "first_prompt_time": first_prompt_iso or iso_z(first_ts),
        "last_prompt_time": last_prompt_iso or iso_z(first_ts),
    }
    LOGS_DIR.mkdir(parents=True, exist_ok=True)
    out_path.write_text(build_header(meta, author) + "".join(entries), encoding="utf-8")
    print(f"wrote {out_path.name} ({len(turns)} turns)")
    return out_path


def main() -> int:
    transcripts_dir = Path(
        os.environ.get("CURSOR_AGENT_TRANSCRIPTS_DIR", str(DEFAULT_TRANSCRIPTS))
    )
    force = "--force" in sys.argv
    if not transcripts_dir.is_dir():
        print(f"Transcripts dir not found: {transcripts_dir}", file=sys.stderr)
        return 1

    author = git_author()
    written = 0
    for session_dir in sorted(transcripts_dir.iterdir(), key=lambda p: p.name):
        if not session_dir.is_dir():
            continue
        jsonl = session_dir / f"{session_dir.name}.jsonl"
        if not jsonl.is_file():
            continue
        if backfill_session(session_dir.name, jsonl, author, force):
            written += 1

    print(f"Done. {written} session log(s) in {LOGS_DIR}")
    print("Re-run after new chats to append missing sessions (skips existing session_id).")
    print("Use --force to overwrite logs for sessions already in .agent-logs/.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
