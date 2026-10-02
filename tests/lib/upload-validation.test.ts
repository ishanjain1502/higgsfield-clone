import { describe, it, expect } from "vitest";
import decisions from "../../.docs/decisions-v1.json";
import { validateUploadFile } from "@/lib/upload-validation";

const o5 = decisions.O5;

function supportedCopyInMessage(message: string) {
  for (const mime of o5.allowedMimeTypes) {
    expect(message).toContain(mime);
  }
  for (const codec of o5.allowedCodecs) {
    expect(message).toContain(codec);
  }
}

describe("validateUploadFile", () => {
  it("rejects files over 20MB", () => {
    const file = new File([new Uint8Array(20971521)], "big.mp4", {
      type: "video/mp4",
    });
    const result = validateUploadFile(file);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      supportedCopyInMessage(result.message);
    }
  });

  it("accepts video/mp4 at max size", () => {
    const file = new File([new Uint8Array(o5.maxBytes)], "max.mp4", {
      type: "video/mp4",
    });
    expect(validateUploadFile(file)).toEqual({ ok: true });
  });

  it("accepts video/webm under max size", () => {
    const file = new File([new Uint8Array(1024)], "clip.webm", {
      type: "video/webm",
    });
    expect(validateUploadFile(file)).toEqual({ ok: true });
  });

  it("rejects unsupported MIME types and lists supported types and codecs", () => {
    const file = new File([new Uint8Array(100)], "clip.mov", {
      type: "video/quicktime",
    });
    const result = validateUploadFile(file);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      supportedCopyInMessage(result.message);
    }
  });
});
