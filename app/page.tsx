"use client";

import { useEffect, useRef, useState } from "react";
import { SparkleIcon } from "@/components/icons";
import { ChatComposer } from "@/components/chat/ChatComposer";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { UploadButton } from "@/components/chat/UploadButton";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const hasStarted = messages.length > 0;

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isThinking]);

  async function handleSend() {
    const text = input.trim();
    if (!text || !file) return;
    const history = messages;
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", content: text },
    ]);
    setInput("");
    setIsThinking(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENCD_URL}/chat`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: history.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!res.ok) throw new Error(`Something went wrong ${res.status}`);

      const data = await res.json();
      console.log({ data });

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.answer,
        },
      ]);

      console.log({ messages });
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: `Something went wrong`,
        },
      ]);
      console.log({ errmessages: messages });
    } finally {
      setIsThinking(false);
      console.log({ finally: messages });
    }
  }

  async function handleFileUpload(selectedFile: File) {
    setFile(selectedFile);
    setIsUploading((prevValue) => {
      prevValue = true;
      return prevValue;
    });

    const formdata = new FormData();
    formdata.append("file", selectedFile);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENCD_URL}/upload`, {
      method: "POST",
      body: formdata,
    });

    if (!res.ok) {
      setIsUploading((prevValue) => {
        prevValue = false;
        return prevValue;
      });
      setFile(null);
      throw new Error("Failed to upload file");
    }
    const data = await res.json();
    console.log("File uploaded successfully:", data);
    setIsUploading((prevValue) => {
      prevValue = false;
      return prevValue;
    });
  }

  if (!hasStarted) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4">
        <div className="flex items-center gap-3">
          <SparkleIcon className="h-8 w-8 text-accent" />
          <h1 className="font-serif text-3xl text-text-primary sm:text-4xl">
            {file ? "Ask away" : "Upload a document to begin"}
          </h1>
        </div>
        <div className="flex w-full max-w-2xl flex-col items-center gap-4">
          <UploadButton
            file={file}
            isUploading={isUploading}
            onFileSelect={handleFileUpload}
          />
          <ChatComposer
            value={input}
            onChange={setInput}
            onSend={handleSend}
            disabled={!file && !isUploading}
            placeholder={
              file
                ? "Ask something about your document..."
                : "Upload a document to start chatting"
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-2 text-text-primary">
          <SparkleIcon className="h-5 w-5 text-accent" />
          <span className="text-sm font-medium">{file?.name}</span>
        </div>
      </header>

      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-6 py-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          {messages.map((m) => (
            <ChatMessage key={m.id} role={m.role} content={m.content} />
          ))}
          {isThinking && (
            <ChatMessage role="assistant" content="Thinking..." pending />
          )}
        </div>
      </div>

      <div className="border-t border-border px-6 py-4">
        <div className="mx-auto max-w-3xl">
          <ChatComposer
            value={input}
            onChange={setInput}
            onSend={handleSend}
            placeholder="Write a message..."
          />
          <p className="mt-2 text-center text-xs text-text-muted">
            AI can make mistakes. Please double-check responses.
          </p>
        </div>
      </div>
    </div>
  );
}
