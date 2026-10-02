/**
 * Parse Cursor hook stdin JSON. On Windows, workspace_roots often contain
 * unescaped backslashes, which makes the payload invalid strict JSON.
 */

export function repairInvalidJsonEscapes(raw) {
  return raw.replace(/\\(?!["\\/bfnrtu]|u[0-9a-fA-F]{4})/g, "\\\\");
}

export function parseHookInput(raw) {
  const text = raw.replace(/^\uFEFF/, "").trim();
  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    try {
      return JSON.parse(repairInvalidJsonEscapes(text));
    } catch {
      return null;
    }
  }
}
