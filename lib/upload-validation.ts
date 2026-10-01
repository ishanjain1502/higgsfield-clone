import decisions from "../.docs/decisions-v1.json";

const o5 = decisions.O5;

export type UploadValidationResult =
  | { ok: true }
  | { ok: false; message: string };

function supportedFormatsMessage(): string {
  const types = o5.allowedMimeTypes.join(", ");
  const codecs = o5.allowedCodecs.join(", ");
  return `Supported types: ${types}. Supported codecs: ${codecs}.`;
}

export function validateUploadFile(file: File): UploadValidationResult {
  if (file.size > o5.maxBytes) {
    return {
      ok: false,
      message: `File exceeds the maximum size of 20 MB. ${supportedFormatsMessage()}`,
    };
  }

  if (!o5.allowedMimeTypes.includes(file.type)) {
    return {
      ok: false,
      message: `Unsupported file type. ${supportedFormatsMessage()}`,
    };
  }

  return { ok: true };
}
