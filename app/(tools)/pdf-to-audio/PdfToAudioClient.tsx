"use client";

import { Pause, Play, Volume2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { FileDropzone } from "@/components/shared/FileDropzone";
import { FileList } from "@/components/shared/FileList";
import { ProcessButton } from "@/components/shared/ProcessButton";
import { TextResult } from "@/components/shared/TextResult";
import { ToolShell } from "@/components/shared/ToolShell";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Slider } from "@/components/ui/Slider";
import { usePdfTool } from "@/hooks/usePdfTool";

export function PdfToAudioClient() {
  const tool = usePdfTool();
  const [text, setText] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceName, setVoiceName] = useState("");
  const [rate, setRate] = useState(1);
  const [speaking, setSpeaking] = useState(false);
  const loading = tool.status === "processing";
  const voiceOptions = useMemo(
    () => voices.map((voice) => ({ value: voice.name, label: voice.name })),
    [voices],
  );

  useEffect(() => {
    const loadVoices = () => {
      const nextVoices = window.speechSynthesis.getVoices();
      setVoices(nextVoices);
      setVoiceName((current) => current || nextVoices[0]?.name || "");
    };

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => {
      window.speechSynthesis.cancel();
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
    };
  }, []);

  return (
    <ToolShell icon={<Volume2 className="h-5 w-5" aria-hidden="true" />} title="PDF to Audio" description="Listen to extracted PDF text using browser voices.">
      <div className="space-y-5">
        <FileDropzone accept={{ "application/pdf": [".pdf"] }} onDrop={tool.onDrop} label="Drop a PDF file here" sublabel="Select one PDF" />
        {tool.files.length > 0 ? <FileList files={tool.files} onRemove={tool.removeFile} /> : null}
        <p className="soft-panel rounded-none p-3 text-xs text-text-secondary">Audio uses your browser&apos;s built-in text-to-speech voices.</p>
        {tool.error ? <p className="text-sm font-medium text-error">{tool.error}</p> : null}
        {text ? (
          <div className="space-y-4">
            <div className="glass-card grid gap-3 rounded-none p-4 sm:grid-cols-2">
              <Select label="Voice" value={voiceName} onChange={setVoiceName} options={voiceOptions.length ? voiceOptions : [{ value: "", label: "Default voice" }]} />
              <Slider label="Speed" min={0.5} max={2} step={0.1} value={rate} showValue onChange={setRate} />
              <Button icon={speaking ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />} onClick={() => {
                if (speaking) {
                  window.speechSynthesis.cancel();
                  setSpeaking(false);
                } else {
                  speakChunks(text, voices.find((voice) => voice.name === voiceName), rate, () => setSpeaking(false));
                  setSpeaking(true);
                }
              }}>
                {speaking ? "Stop" : "Play"}
              </Button>
            </div>
            <TextResult text={text} filename="audio-transcript.txt" />
          </div>
        ) : (
          <ProcessButton disabled={tool.files.length === 0} loading={loading} progress={tool.progress} onClick={() => tool.process(async ([file], onProgress) => {
            const { extractText } = await import("@/lib/pdf/extract-text");
            onProgress(20);
            const output = await extractText(file);
            setText(output);
            onProgress(100);
            return { blob: new Blob([output], { type: "text/plain" }), filename: "audio-transcript.txt" };
          })}>
            Extract audio text
          </ProcessButton>
        )}
      </div>
    </ToolShell>
  );
}

function speakChunks(
  text: string,
  voice: SpeechSynthesisVoice | undefined,
  rate: number,
  onEnd: () => void,
) {
  const chunks = text.match(/[\s\S]{1,1800}(?:\s|$)/g) ?? [text];
  let index = 0;

  const speakNext = () => {
    const chunk = chunks[index];
    if (!chunk) {
      onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(chunk);
    utterance.voice = voice ?? null;
    utterance.rate = rate;
    utterance.onend = () => {
      index += 1;
      speakNext();
    };
    window.speechSynthesis.speak(utterance);
  };

  window.speechSynthesis.cancel();
  speakNext();
}
