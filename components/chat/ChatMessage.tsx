import { SparkleIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  pending?: boolean;
}

export function ChatMessage({ role, content, pending }: ChatMessageProps) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[75%] whitespace-pre-wrap rounded-2xl bg-surface px-4 py-2.5 text-sm text-text-primary">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <SparkleIcon className="mt-1 h-5 w-5 shrink-0 text-accent" />
      <p
        className={cn(
          "whitespace-pre-wrap text-sm leading-relaxed text-text-primary",
          pending && "text-text-muted italic",
        )}
      >
        {content}
      </p>
    </div>
  );
}
