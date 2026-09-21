"use client";

import { KeyboardEvent } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SendIcon } from "@/components/icons";

interface ChatComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatComposer({
  value,
  onChange,
  onSend,
  disabled = false,
  placeholder,
}: ChatComposerProps) {
  const canSend = !disabled && value.trim().length > 0;

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (canSend) onSend();
    }
  }

  return (
    <div className="flex w-full items-end gap-2 rounded-3xl border border-border bg-surface px-4 py-3 shadow-sm transition-colors focus-within:border-accent/50">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        className="max-h-48 py-1"
      />
      <Button
        type="button"
        variant="primary"
        size="sm"
        aria-label="Send message"
        disabled={!canSend}
        onClick={onSend}
        className="h-9 w-9 rounded-full p-0"
      >
        <SendIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
