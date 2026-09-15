"use client";

import { ChangeEvent, KeyboardEvent } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SendIcon } from "@/components/icons";

interface ChatComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  temperature: number;
  onTemperatureChange: (value: number) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatComposer({
  value,
  onChange,
  onSend,
  temperature,
  onTemperatureChange,
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

  function handleTemperatureChange(e: ChangeEvent<HTMLInputElement>) {
    const raw = parseFloat(e.target.value);
    const clamped = Number.isNaN(raw) ? 0 : Math.min(1, Math.max(0, raw));
    onTemperatureChange(clamped);
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
      <input
        type="number"
        min={0}
        max={1}
        step={0.1}
        value={temperature}
        onChange={handleTemperatureChange}
        disabled={disabled}
        aria-label="Temperature (0-1)"
        title="Temperature (0-1)"
        className="h-9 w-14 shrink-0 rounded-full border border-border bg-transparent px-2 text-center text-xs text-text-primary focus:border-accent/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
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
