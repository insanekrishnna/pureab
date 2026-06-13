"use client";

import { ArrowUp, MessageSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { FileDropzone } from "@/components/shared/FileDropzone";
import { FileList } from "@/components/shared/FileList";
import { ToolShell } from "@/components/shared/ToolShell";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { usePdfTool } from "@/hooks/usePdfTool";
import { streamGemini } from "@/lib/ai/streamGemini";
import { cn } from "@/lib/utils/cn";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatWithPdfClient() {
  const tool = usePdfTool();
  const [extractedText, setExtractedText] = useState("");
  const [extracting, setExtracting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollerRef.current?.scrollTo({
      top: scrollerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, streaming]);

  async function handleDrop(files: File[]) {
    tool.onDrop(files);
    setExtracting(true);
    setExtractedText("");
    setMessages([]);

    try {
      const { extractText } = await import("@/lib/pdf/extract-text");
      setExtractedText(await extractText(files[0]));
    } finally {
      setExtracting(false);
    }
  }

  async function sendMessage() {
    const userQuestion = question.trim();
    if (!userQuestion || !extractedText || streaming) return;

    setQuestion("");
    setMessages((current) => [
      ...current,
      { role: "user", content: userQuestion },
      { role: "assistant", content: "" },
    ]);
    setStreaming(true);

    try {
      await streamGemini(
        extractedText,
        `Answer this question about the document: ${userQuestion}`,
        (token) => {
          setMessages((current) => {
            const next = [...current];
            const last = next[next.length - 1];
            if (last?.role === "assistant") {
              next[next.length - 1] = {
                ...last,
                content: last.content + token,
              };
            }
            return next;
          });
        },
      );
    } finally {
      setStreaming(false);
    }
  }

  return (
    <ToolShell
      icon={<MessageSquare className="h-5 w-5" aria-hidden="true" />}
      title="Chat with PDF"
      description="Ask questions and get answers grounded in your document."
    >
      <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
        <div className="space-y-4">
          <FileDropzone
            accept={{ "application/pdf": [".pdf"] }}
            onDrop={handleDrop}
            label="Drop a PDF file here"
            sublabel="Text is extracted locally"
          />
          {tool.files.length > 0 ? (
            <FileList files={tool.files} onRemove={tool.removeFile} />
          ) : null}
          {extracting ? (
            <p className="text-sm text-text-secondary">Extracting text...</p>
          ) : null}
        </div>
        <div className="glass-card flex min-h-[520px] flex-col overflow-hidden rounded-lg">
          <div ref={scrollerRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center text-sm text-text-muted">
                Upload a PDF, then ask a question.
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-md px-3 py-2 text-sm leading-relaxed shadow-sm",
                      message.role === "user"
                        ? "bg-accent text-accent-foreground"
                        : "bg-bg-subtle text-text-primary",
                    )}
                  >
                    {message.content ||
                      (streaming && message.role === "assistant" ? "..." : "")}
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="border-t border-border p-3">
            <div className="flex gap-2">
              <Input
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") void sendMessage();
                }}
                placeholder="Ask about this PDF..."
                disabled={!extractedText || extracting}
              />
              <Button
                onClick={sendMessage}
                disabled={!question.trim() || !extractedText || streaming}
                icon={<ArrowUp className="h-4 w-4" aria-hidden="true" />}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
