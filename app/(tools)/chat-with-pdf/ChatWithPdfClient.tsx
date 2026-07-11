"use client";

import { motion } from "framer-motion";
import { ArrowUp, MessageSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { FileDropzone } from "@/components/shared/FileDropzone";
import { FileList } from "@/components/shared/FileList";
import { ToolShell } from "@/components/shared/ToolShell";
import { ExploreCard, ExploreCardData } from "@/components/chat/ExploreCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { usePdfTool } from "@/hooks/usePdfTool";
import { streamGemini } from "@/lib/ai/streamGemini";
import { cn } from "@/lib/utils/cn";

function TypingIndicator() {
  return (
    <div className="flex space-x-1.5 items-center h-6 px-2">
      <motion.div 
        className="w-1.5 h-1.5 bg-text-muted rounded-none" 
        animate={{ opacity: [0.4, 1, 0.4] }} 
        transition={{ duration: 1.4, repeat: Infinity, delay: 0 }} 
      />
      <motion.div 
        className="w-1.5 h-1.5 bg-text-muted rounded-none" 
        animate={{ opacity: [0.4, 1, 0.4] }} 
        transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }} 
      />
      <motion.div 
        className="w-1.5 h-1.5 bg-text-muted rounded-none" 
        animate={{ opacity: [0.4, 1, 0.4] }} 
        transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }} 
      />
    </div>
  );
}

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
  const [placeholderText, setPlaceholderText] = useState("");
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targetText = "Summarize this PDF...";
    let currentText = "";
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex < targetText.length) {
        currentText += targetText[currentIndex];
        setPlaceholderText(currentText);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

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

  async function sendMessage(overrideQuestion?: string) {
    const userQuestion = (typeof overrideQuestion === "string" ? overrideQuestion : question).trim();
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
        `Answer this question about the document: ${userQuestion}

If your answer recommends or discusses a specific tool, product, place, or resource, please append an explore card to your response using EXACTLY this format at the very end:
<ExploreCard>{"title": "...", "description": "...", "type": "tool", "actionText": "..."}</ExploreCard>
Valid types are "tool", "product", "place", or "resource".`,
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
        <div className="glass-card flex h-[60vh] max-h-[600px] min-h-[400px] flex-col overflow-hidden rounded-none">
            <div ref={scrollerRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-6 p-6">
                {!extractedText ? (
                  <div className="text-sm text-text-muted mono-copy uppercase tracking-widest text-[8px]">
                    UPLOAD PDF TO START CHAT
                  </div>
                ) : (
                  <div className="flex flex-col items-start gap-1.5 mt-auto self-start ml-0 mb-2 max-w-[85%]">
                    <p className="text-[8px] text-text-secondary mb-0.5">Try asking one of these:</p>
                    {[
                      "What tools are mentioned in this PDF?",
                      "Can you summarize the main points in 3 bullets?",
                      "Are there any products recommended in this document?"
                    ].map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setQuestion(suggestion);
                          void sendMessage(suggestion);
                        }}
                        className="w-fit text-left px-2 py-1 bg-bg-base/60 border border-border/50 hover:border-[#7b61ff]/60 hover:bg-[#7b61ff]/10 transition-all duration-300 text-[8px] text-text-primary rounded-sm shadow-sm"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {messages.map((message, index) => {
                  const isUser = message.role === "user";
                  const isLastAssistant = index === messages.length - 1 && !isUser;
                  
                  let cleanContent = message.content;
                  let exploreCardData: ExploreCardData | null = null;
                  
                  const exploreCardMatch = message.content.match(/<ExploreCard>([\s\S]*?)<\/ExploreCard>/);
                  if (exploreCardMatch) {
                    cleanContent = message.content.replace(exploreCardMatch[0], "").trim();
                    try {
                      exploreCardData = JSON.parse(exploreCardMatch[1]);
                    } catch (e) {
                      console.error("Failed to parse explore card", e);
                    }
                  }

                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={`${message.role}-${index}`}
                      className={cn(
                        "flex w-full",
                        isUser ? "justify-end" : "justify-start",
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] rounded-none px-4 py-3 text-sm leading-relaxed shadow-sm relative",
                          isUser
                            ? "bg-[#25D366]/10 border border-[#25D366]/30 text-text-primary"
                            : "bg-bg-subtle border border-border text-text-primary",
                        )}
                      >
                        {isLastAssistant && streaming && !message.content ? (
                          <TypingIndicator />
                        ) : (
                          <div className="flex flex-col">
                            {cleanContent && <div className="mono-copy whitespace-pre-wrap">{cleanContent}</div>}
                            {exploreCardData && <ExploreCard data={exploreCardData} />}
                          </div>
                        )}
                        
                        {/* Chat bubble tail for rectangular theme */}
                        <div 
                          className={cn(
                            "absolute top-0 w-3 h-3 border-t border-solid",
                            isUser ? "-right-3 border-r border-[#25D366]/30 border-t-[#25D366]/30 bg-[#25D366]/10" : "-left-3 border-l border-border border-t-border bg-bg-subtle"
                          )}
                          style={{ clipPath: isUser ? "polygon(0 0, 100% 0, 0 100%)" : "polygon(0 0, 100% 0, 100% 100%)" }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
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
                placeholder={placeholderText}
                disabled={!extractedText || extracting}
              />
              <Button
                onClick={() => void sendMessage()}
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
