"use client";

import { Copy, Download } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { triggerDownload } from "@/lib/utils/download";

interface TextResultProps {
  text: string;
  filename: string;
}

export function TextResult({ text, filename }: TextResultProps) {
  return (
    <div className="space-y-3">
      <textarea
        readOnly
        value={text}
        className="soft-panel h-64 w-full resize-none rounded-none p-4 font-mono text-sm leading-relaxed text-text-primary focus:outline-none"
      />
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          variant="secondary"
          icon={<Copy className="h-4 w-4" aria-hidden="true" />}
          onClick={() => navigator.clipboard.writeText(text)}
        >
          Copy text
        </Button>
        <Button
          icon={<Download className="h-4 w-4" aria-hidden="true" />}
          onClick={() =>
            triggerDownload(new Blob([text], { type: "text/plain" }), filename)
          }
        >
          Download as .txt
        </Button>
      </div>
    </div>
  );
}
