#!/usr/bin/env python3
"""Rebuild .agent-logs/.capture-state.json from existing session log markdown files."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
LOGS_DIR = REPO_ROOT / ".agent-logs"
STATE_PATH = LOGS_DIR / ".capture-state.json"

FRONTMATTER_SESSION = re.compile(r"^session_id:\s*(.+)$", re.MULTILINE)
FRONTMATTER_MODEL = re.compile(r"^model:\s*(.+)$", re.MULTILINE)
LOG_ENTRY = re.compile(
    r"\[LOG_ENTRY type=(PROMPT|RESPONSE) num=(\d+) session=[^\]]+\]\n"
    r"timestamp:\s*(.+)\n"
    r"model:\s*(.+)\n",
    re.MULTILINE,
)


def parse_log_file(path: Path) -> dict | None:
    text = path.read_text(encoding="utf-8", errors="replace")
    session_m = FRONTMATTER_SESSION.search(text)
    if not session_m:
        return None
    session_id = session_m.group(1).strip()
    model_m = FRONTMATTER_MODEL.search(text)
    default_model = model_m.group(1).strip() if model_m else "unknown"

    prompts: dict[int, tuple[str, str]] = {}
    responses: dict[int, tuple[str, str]] = {}
    last_model = default_model
    all_times: list[str] = []

    for match in LOG_ENTRY.finditer(text):
        kind, num_s, ts, entry_model = match.groups()
        num = int(num_s)
        last_model = entry_model.strip()
        all_times.append(ts.strip())
        if kind == "PROMPT":
            prompts[num] = (ts.strip(), last_model)
        else:
            responses[num] = (ts.strip(), last_model)

    if not prompts and not responses:
        return None

    nums = sorted(set(prompts) | set(responses))
    exchange_num = max(nums) if nums else 0
    prompt_count = len(prompts)
    response_count = len(responses)

    pending: int | None = None
    for num in sorted(prompts, reverse=True):
        if num not in responses:
            pending = num
            break

    prompt_times = [ts for ts, _ in prompts.values()]
    first_prompt_time = min(prompt_times) if prompt_times else None
    last_prompt_time = max(prompt_times) if prompt_times else None
    started_at = min(all_times) if all_times else first_prompt_time

    return {
        "session_id": session_id,
        "log_file": str(path.resolve()),
        "started_at": started_at or "",
        "exchange_num": exchange_num,
        "pending_prompt_num": pending,
        "first_prompt_time": first_prompt_time,
        "last_prompt_time": last_prompt_time,
        "last_model": last_model,
        "prompt_count": prompt_count,
        "response_count": response_count,
    }


def main() -> int:
    if not LOGS_DIR.is_dir():
        print(f"Missing logs dir: {LOGS_DIR}", file=sys.stderr)
        return 1

    sessions: dict[str, dict] = {}
    for path in sorted(LOGS_DIR.glob("*.md")):
        parsed = parse_log_file(path)
        if not parsed:
            print(f"skip {path.name} (no session_id or entries)")
            continue
        key = parsed["session_id"]
        sessions[key] = parsed
        print(
            f"indexed {path.name}: prompts={parsed['prompt_count']} "
            f"responses={parsed['response_count']} pending={parsed['pending_prompt_num']}"
        )

    LOGS_DIR.mkdir(parents=True, exist_ok=True)
    STATE_PATH.write_text(
        json.dumps({"sessions": sessions}, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Wrote {STATE_PATH} ({len(sessions)} session(s))")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
