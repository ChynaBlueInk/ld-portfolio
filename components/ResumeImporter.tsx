"use client";

import React, { useRef, useState } from "react";

export type ParsedProfile = {
  name?: string;
  email?: string;
  phone?: string;
  summary?: string;
  rawText: string;
};

export type Parsed = ParsedProfile;

type Props = {
  onParsed?: (data: ParsedProfile) => void;
  onPrefill?: (data: ParsedProfile) => void;
  className?: string;
};

export default function ResumeImporter({ onParsed, onPrefill, className }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<ParsedProfile | null>(null);

  function resetInput() {
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleFile(file: File) {
    setStatus("loading");
    setError(null);

    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch("/api/resume/parse", {
        method: "POST",
        body: fd,
      });

      const json = await res.json().catch(() => ({} as any));

      if (!res.ok || !json?.ok) {
        if (res.status === 415) throw new Error("Unsupported file type. Upload PDF or DOCX.");
        if (res.status === 413) throw new Error("File too large. Try a smaller resume.");
        if (res.status === 422) throw new Error("We couldn’t extract text from that document.");
        throw new Error(json?.error || "Failed to parse resume.");
      }

      const data: ParsedProfile = json.data;
      setPreview(data);
      onParsed?.(data);
      onPrefill?.(data);
      setStatus("done");
    } catch (e: any) {
      setError(e?.message ?? "Unknown error.");
      setStatus("error");
      setPreview(null);
    } finally {
      resetInput();
    }
  }

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Import from Resume (PDF or DOCX)
      </label>

      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 hover:file:bg-gray-200"
        />
      </div>

      {status === "loading" && (
        <p className="mt-2 text-sm text-gray-600">Parsing your document…</p>
      )}
      {status === "error" && error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}

      {preview && (
        <div className="mt-4 rounded-lg border border-gray-200 p-3 text-sm">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div><span className="font-semibold">Name:</span> {preview.name || "—"}</div>
            <div><span className="font-semibold">Email:</span> {preview.email || "—"}</div>
            <div><span className="font-semibold">Phone:</span> {preview.phone || "—"}</div>
            <div className="md:col-span-2">
              <span className="font-semibold">Summary:</span>{" "}
              {preview.summary || "—"}
            </div>
          </div>
          <details className="mt-2">
            <summary className="cursor-pointer">Show extracted text</summary>
            <pre className="mt-2 max-h-56 overflow-auto whitespace-pre-wrap text-xs">
              {preview.rawText}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}
