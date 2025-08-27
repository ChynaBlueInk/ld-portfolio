export const runtime = "nodejs";

import { NextResponse } from "next/server";
import mammoth from "mammoth";
import pdfParse from "pdf-parse";

function extractFields(text: string) {
  const clean = text.replace(/\u0000/g, "").replace(/[ \t]+\n/g, "\n").trim();

  const email = (clean.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i) || [])[0] || "";
  const phone = (clean.match(/(?:\+?\d{1,3}[\s-]?)?(?:\(?\d{2,4}\)?[\s-]?)?\d{3,4}[\s-]?\d{3,4}/) || [])[0] || "";
  const links = Array.from(new Set((clean.match(/https?:\/\/[^\s)]+/g) || []).slice(0, 10)));
  const lines = clean.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  const fullName =
    lines.find(l => !l.match(/@|https?:\/\//) && l.length < 60 && l.split(/\s+/).length <= 6) || "";

  const nameIdx = lines.indexOf(fullName);
  const headline = nameIdx >= 0
    ? (lines.slice(nameIdx + 1, nameIdx + 4).find(l => l.split(/\s+/).length <= 10 && !l.match(/@|https?:\/\//)) || "")
    : "";

  const location = (clean.match(/\b(City|Town|Province|Region|NZ|New Zealand|Australia|Timor|Dili|Wellington|Auckland|Sydney|Melbourne)\b.*/i) || [""])[0];

  let skills: string[] = [];
  const skillsBlock = clean.split(/(?:^|\n)(?:skills|technical skills|key skills)[:\s]*\n/i)[1];
  if (skillsBlock) {
    const uptoNextHeading = skillsBlock.split(/\n[A-Z][A-Za-z ]{2,30}\n/)[0] || skillsBlock;
    skills = uptoNextHeading
      .split(/\n|,|•|-|\u2022/)
      .map(s => s.trim())
      .filter(s => s && s.length <= 40)
      .slice(0, 30);
  }

  let summary = "";
  const sumBlock = clean.split(/(?:^|\n)(?:summary|profile|about me)[:\s]*\n/i)[1];
  if (sumBlock) {
    summary = (sumBlock.split(/\n[A-Z][A-Za-z ]{2,30}\n/)[0] || "").trim().slice(0, 800);
  }

  const roleLine = (clean.match(/^[^\n]{0,70}(?: at | @ | – | - )[^\n]{0,70}$/m) || [])[0] || "";
  let currentRole = "", currentCompany = "";
  if (roleLine) {
    const m = roleLine.match(/^(.*?)\s*(?: at | @ | – | - )\s*(.*)$/);
    if (m) { currentRole = m[1].trim(); currentCompany = m[2].trim(); }
  }

  return {
    fullName,
    email,
    phone,
    headline,
    location,
    links,
    skills,
    summary,
    currentRole,
    currentCompany,
    rawText: clean.slice(0, 100000)
  };
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const buf = Buffer.from(await file.arrayBuffer());
    const name = (file.name || "").toLowerCase();

    let text = "";
    if (name.endsWith(".docx")) {
      const result = await mammoth.extractRawText({ buffer: buf });
      text = result.value || "";
    } else if (name.endsWith(".pdf")) {
      const result: any = await pdfParse(buf);
      text = result.text || "";
    } else {
      return NextResponse.json({ error: "Unsupported file type. Use PDF or DOCX." }, { status: 400 });
    }

    const data = extractFields(text);
    return NextResponse.json({ ok: true, data });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Parse failed" }, { status: 500 });
  }
}
