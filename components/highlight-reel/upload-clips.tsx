"use client";

import { useRef, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { validateUploadFile } from "@/lib/upload-validation";

type UploadEntry = { id: string; name: string };

type UploadClipsProps = {
  uploads: UploadEntry[];
  onChange: (uploads: UploadEntry[]) => void;
};

export function UploadClips({ uploads, onChange }: UploadClipsProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFiles(fileList: FileList | null) {
    if (!fileList?.length) {
      return;
    }
    const file = fileList[0];
    const result = validateUploadFile(file);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    setError(null);
    const entry: UploadEntry = {
      id: `upload-${crypto.randomUUID()}`,
      name: file.name,
    };
    onChange([...uploads, entry]);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function removeUpload(id: string) {
    onChange(uploads.filter((u) => u.id !== id));
  }

  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-medium">Optional local uploads</p>
        <p className="text-sm text-muted-foreground">
          Shown in the recipe only — not sent to a server in this demo.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="video/mp4,video/webm"
          className="text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-sm file:font-medium"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      {error ? (
        <Alert variant="destructive">
          <AlertTitle>Upload rejected</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      {uploads.length > 0 ? (
        <ul className="space-y-2">
          {uploads.map((upload) => (
            <li
              key={upload.id}
              className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm"
            >
              <span className="truncate">{upload.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeUpload(upload.id)}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
