// app/professionals/ProsPageClient.tsx
"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import Link from "next/link";
import { MOCK_PROFESSIONALS, type Professional } from "./_mock";

export default function ProsPageClient() {
  const [all] = useState<Professional[]>(MOCK_PROFESSIONALS);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Browse L&amp;D Professionals
          </h1>
          <p className="text-lg text-gray-600">
            Public preview is on — authentication is temporarily disabled so anyone can browse and provide feedback.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {all.map((p) => (
            <div
              key={p.id}
              className="flex flex-col rounded-lg border border-gray-200 bg-white shadow p-6"
            >
              <div className="flex flex-col items-center text-center">
                {/* avatar */}
                <div className="h-24 w-24 rounded-full bg-gray-200 mb-4 overflow-hidden">
                  {/* use plain img to avoid remote image config */}
                  <img
                    src={p.image || "/placeholder.svg?height=400&width=400"}
                    alt={p.name}
                    className="h-24 w-24 object-cover"
                  />
                </div>

                <h2 className="text-lg font-semibold">{p.name}</h2>
                <p className="text-sm text-gray-500">{p.title || "—"}</p>
                <p className="text-sm text-gray-500">
                  {p.location || p.region || "—"}
                </p>

                {p.bio && (
                  <p className="mt-2 text-sm text-gray-600 line-clamp-3">{p.bio}</p>
                )}

                {/* small chips */}
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {(p.skills || []).slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="rounded-full border px-2 py-0.5 text-xs text-gray-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/professionals/${p.id}`}
                  className="mt-4 inline-block rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
