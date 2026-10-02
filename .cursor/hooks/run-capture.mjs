#!/usr/bin/env node
/**
 * Cursor hook entrypoint (Node). Cursor on Windows often fails to spawn bare
 * `python`; Node is on PATH for this repo and delegates to agent_capture.py.
 */
import { spawnSync } from "node:child_process";
import { appendFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { parseHookInput } from "./parse-hook-input.mjs";

const hookDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(hookDir, "..", "..");
const logsDir = join(projectRoot, ".agent-logs");
const witnessPath = join(logsDir, ".hook-invocations.log");
const scriptPath = join(hookDir, "agent_capture.py");

function witness(line) {
  mkdirSync(logsDir, { recursive: true });
  appendFileSync(witnessPath, `${new Date().toISOString()} ${line}\n`, "utf8");
}

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

const input = await readStdin();
const payload = parseHookInput(input);
const event = payload?.hook_event_name ?? (input.trim() ? "parse-error" : "empty");
witness(`wrapper event=${event} bytes=${input.length}`);

const pyCommands = [
  process.env.AGENT_CAPTURE_PYTHON,
  "python",
  "python3",
  "py",
].filter(Boolean);

for (const py of pyCommands) {
  const isPyLauncher = py === "py";
  const args = isPyLauncher
    ? ["-3", scriptPath]
    : [scriptPath];
  const result = spawnSync(py, args, {
    cwd: projectRoot,
    input,
    encoding: "utf8",
    stdio: ["pipe", "pipe", "pipe"],
  });

  if (result.error) {
    witness(`spawn ${py} error=${result.error.message}`);
    continue;
  }

  if (result.stderr?.trim()) {
    witness(`spawn ${py} stderr=${result.stderr.trim().slice(0, 400)}`);
  }

  if (result.status === 0) {
    process.stdout.write(result.stdout || '{"continue": true}');
    process.exit(0);
  }
  witness(`spawn ${py} exit=${result.status}`);
}

witness("all python candidates failed");
process.stdout.write('{"continue": true}');
process.exit(0);
