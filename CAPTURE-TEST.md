# Agent capture verification — 8x assignment

## 1. Tool and model

| Item | Value |
| --- | --- |
| **Tool** | Cursor (Composer / Agent chat) |
| **Primary model** | User-selected Composer model (hook logs `model` / `model_id` from Cursor on each event; dry-run used `composer-2.5`) |
| **Planning vs execution** | Same Composer session model plans and executes the main agent loop; optional subagents (Task tool) can use a different model from Cursor’s allowed list |
| **Automatic lifecycle hooks?** | **Yes** — project hooks in `.cursor/hooks.json` (`sessionStart`, `beforeSubmitPrompt`, `afterAgentResponse`, `sessionEnd`). Documented at [Cursor Hooks](https://cursor.com/docs/hooks). |

## 2. Mechanism and config

**Approach:** Command hooks that append **only** the user prompt (`beforeSubmitPrompt`) and the **final** assistant text (`afterAgentResponse`) to `.agent-logs/`. No tool calls, thinking blocks, or intermediate steps (`afterAgentThought` is intentionally not wired).

**Files changed / added:**

- `.cursor/hooks.json` — registers the capture script on the four lifecycle events above
- `.cursor/hooks/agent_capture.py` — reads hook JSON from stdin, writes the required markdown log format under `.agent-logs/`

**Not used (checked and rejected):**

- **`agent-transcripts/*.jsonl`** (Cursor’s session store under the project metadata path) — includes tools, thinking, and structure unsuitable for “prompt + final response only” without heavy filtering
- **Project rules alone** — cannot append to disk on each turn without manual steps
- **Manual logging after each reply** — fails the “must fire on its own” requirement

**Workspace:** Project hooks run only in a **trusted** workspace. If canaries do not appear, confirm the folder is trusted and reload the window (Cursor watches `hooks.json` on save).

## 3. Log file path (live canaries)

After live canaries, entries should appear under:

`.agent-logs/YYYY-MM-DD_HH-MM-SS_<conversation-or-session-id>.md`

State file (not part of submission format, safe to commit): `.agent-logs/.capture-state.json`

**Status:** Hooks were installed during the first agent turn on this repo, so the **initial pasted assignment prompt** was not captured by `beforeSubmitPrompt`. Live verification requires the canary prompts below **after** this commit.

## 4. Canary entries

### 4a. Script / format check (stdin simulation — not a substitute for live hooks)

Used to validate markdown format and UTF-8 on Windows before relying on Cursor to invoke the script. Session id `dryrun-1111-2222-3333-4444` (removed from `.agent-logs/` so live logs stay clean).

**PROMPT (simulated):**

```
CAPTURE TEST — 8x assignment, ishan
```

**RESPONSE (simulated):**

```
If you see this in .agent-logs/, the capture script is working.
```

### 4b. Live hook canaries (required for green check)

1. In **this** Composer chat, send exactly: `CAPTURE TEST — 8x assignment, ishan`
2. Confirm **prompt and response** for that turn in a new file under `.agent-logs/`
3. Open a **second** Composer session (new chat), send the same canary again, confirm a **second** log file (or clearly separate session) is written

Paste raw `[LOG_ENTRY ...]` blocks from the live log file(s) below once confirmed:

```
(live canary 1 — paste after step 1–2)

(live canary 2 — paste after step 3)
```

## 5. What did not work at first

1. **Frontmatter refresh bug** — early version duplicated the “Session Log” header when updating metadata; fixed by keeping only `[LOG_ENTRY`… blocks when rewriting the header.
2. **Windows UTF-8 in simulation** — em dash in the canary string corrupted without UTF-8 stdio; hook script now calls `reconfigure(encoding="utf-8")` on stdin/stdout (Cursor forum notes remaining Windows stdin issues for some builds; enable system UTF-8 beta if prompts look corrupted in logs).
