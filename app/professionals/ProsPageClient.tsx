"use client";

export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";
import ProfessionalsFilter, { type FilterState } from "@/components/professionals-filter";
import ProfessionalsList from "@/components/professionals-list";
import { Skeleton } from "@/components/ui/skeleton";
import { MOCK_PROFESSIONALS, type Professional } from "./_mock";

/** Toggle preview with:
 *  - Env: NEXT_PUBLIC_PREVIEW_PROS=1  (forces mocks everywhere)
 *  - URL: /professionals?preview=1    (forces mocks for that tab)
 */
const PREVIEW_FROM_ENV =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_PREVIEW_PROS === "1";

function normalizeProfessional(raw: any): Professional {
  return {
    id: String(
      raw?.id ||
        raw?.userID ||
        raw?.slug ||
        raw?.email ||
        `api-${Math.random().toString(36).slice(2)}`
    ),
    name:
      raw?.name ||
      raw?.fullName ||
      [raw?.firstName, raw?.lastName].filter(Boolean).join(" ") ||
      "Unnamed",
    title: raw?.title,
    region: raw?.region,
    location: raw?.location,
    image: raw?.image || "/placeholder.svg?height=400&width=400",
    coverImage: raw?.coverImage || "/placeholder.svg",
    bio: raw?.bio,
    yearsExperience: raw?.yearsExperience ?? raw?.experienceYears,
    availability: raw?.availability,
    rate: raw?.rate,
    skills: Array.isArray(raw?.skills) ? raw.skills : undefined,
    services: Array.isArray(raw?.services) ? raw.services : undefined,
    tools: Array.isArray(raw?.tools) ? raw.tools : undefined,
    languages: Array.isArray(raw?.languages) ? raw.languages : undefined,
    certifications: Array.isArray(raw?.certifications) ? raw.certifications : undefined,
    portfolio: Array.isArray(raw?.portfolio) ? raw.portfolio : undefined,
    contact: raw?.contact,
  };
}

function dedupeById<T extends { id: string }>(arr: T[]): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const item of arr) {
    if (!seen.has(item.id)) {
      seen.add(item.id);
      out.push(item);
    }
  }
  return out;
}

export default function ProsPageClient() {
  const [forcePreview, setForcePreview] = useState<boolean>(PREVIEW_FROM_ENV);
  const [all, setAll] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({ search: "", skills: [], services: [] });

  // Read ?preview=1 from URL on client (no useSearchParams)
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    if (sp.get("preview") === "1") setForcePreview(true);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);

      // 1) Hard preview: always show the rich mocks
      if (forcePreview) {
        if (!cancelled) {
          setAll(MOCK_PROFESSIONALS);
          setLoading(false);
        }
        return;
      }

      // 2) Try API
      let normalized: Professional[] = [];
      try {
        const res = await fetch("/api/professionals", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) normalized = data.map(normalizeProfessional);
        }
      } catch {
        /* ignore and fall through */
      }

      // 3) Merge with shared mocks so you always see at least 6 rich entries
      let merged = dedupeById<Professional>([...normalized, ...MOCK_PROFESSIONALS]);

      // 4) Optional: check window.__MOCK_PROFESSIONALS__ if empty
      if (merged.length === 0) {
        const injected = (window as any).__MOCK_PROFESSIONALS__;
        if (Array.isArray(injected)) {
          merged = injected.map(normalizeProfessional);
        }
      }

      if (!cancelled) {
        setAll(merged.length > 0 ? merged : MOCK_PROFESSIONALS);
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [forcePreview]);

  // Derive filter options
  const skillsOptions = useMemo(
    () => Array.from(new Set(all.flatMap((p) => p.skills || []))).sort(),
    [all]
  );
  const servicesOptions = useMemo(
    () => Array.from(new Set(all.flatMap((p) => p.services || []))).sort(),
    [all]
  );

  // Apply filters
  const visible = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return all.filter((p) => {
      const hay = [
        p.name,
        p.title,
        p.location,
        p.region,
        p.bio,
        ...(p.skills || []),
        ...(p.services || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesText = q === "" || hay.includes(q);
      const matchesSkills =
        filters.skills.length === 0 ||
        (p.skills || []).some((s) => filters.skills.includes(s));
      const matchesServices =
        filters.services.length === 0 ||
        (p.services || []).some((s) => filters.services.includes(s));

      return matchesText && matchesSkills && matchesServices;
    });
  }, [all, filters]);

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
          {!forcePreview ? (
            <p className="text-xs text-gray-500">
              Tip: add <code>?preview=1</code> to the URL or set{" "}
              <code>NEXT_PUBLIC_PREVIEW_PROS=1</code> to force the 6 rich mocks.
            </p>
          ) : (
            <p className="text-xs text-emerald-700">
              Preview mode: showing 6 rich mock profiles.
            </p>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* Filters */}
          <div className="lg:col-span-1">
            <ProfessionalsFilter
              defaultState={filters}
              onChange={setFilters}
              skillsOptions={skillsOptions.length ? skillsOptions : undefined}
              servicesOptions={servicesOptions.length ? servicesOptions : undefined}
            />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {loading ? <ListSkeleton /> : <ProfessionalsList data={visible} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="col-span-1 flex flex-col rounded-lg border border-gray-200 bg-white shadow p-6"
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-9 w-24 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
