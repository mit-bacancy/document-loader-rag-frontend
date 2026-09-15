"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { PaperclipIcon } from "@/components/icons";

interface UploadButtonProps {
  file: File | null;
  isUploading: boolean;
  onFileSelect: (file: File) => void;
}

export function UploadButton({
  file,
  onFileSelect,
  isUploading,
}: UploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={(e) => {
          const selected = e.target.files?.[0];
          if (selected) onFileSelect(selected);
        }}
      />

      {!isUploading ? (
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={() => inputRef.current?.click()}
          className="max-w-full"
        >
          <PaperclipIcon className="h-4 w-4 shrink-0" />
          <span className="truncate">
            {file ? file.name : "Upload a document"}
          </span>
        </Button>
      ) : (
        <div className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 max-w-full">
          Uploading...
        </div>
      )}
    </>
  );
}
