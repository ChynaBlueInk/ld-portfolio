"use client";

import { useState } from "react";

type Parsed = {
  fullName?: string; email?: string; phone?: string;
  headline?: string; location?: string; links?: string[];
  skills?: string[]; summary?: string;
  currentRole?: string; currentCompany?: string;
};

export default function ResumeImporter({ onPrefill }: { onPrefill: (data: Parsed) => void }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setErr(null);
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/resume/parse", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Failed to parse");
      onPrefill(json.data as Parsed);
    } catch (e: any) {
      setErr(e?.message || "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        className="block w-full rounded border p-2 bg-white"
        disabled={busy}
      />
      <p className="text-xs text-gray-500">PDF or DOCX only. We parse to prefill—you can edit before saving.</p>
      {busy && <p className="text-sm">Parsing…</p>}
      {err && <p className="text-sm text-red-600">{err}</p>}
    </div>
  );
}
