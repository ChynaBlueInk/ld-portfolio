"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Professional } from "@/app/professionals/_mock";

export default function ProfessionalsList({ data }: { data: Professional[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((p) => (
        <div
          key={p.id}
          className="col-span-1 flex flex-col rounded-lg border border-gray-200 bg-white shadow transition-all hover:shadow-md"
        >
          <div className="flex flex-1 flex-col p-6">
            <div className="flex items-center space-x-4">
              <Image
                src={p.image || "/placeholder.svg"}
                alt={p.name}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-medium text-gray-900">{p.name}</h3>
                <p className="text-sm text-gray-500">{p.title}</p>
                <p className="text-xs text-gray-500">{p.location || p.region}</p>
              </div>
            </div>

            {p.bio && <p className="mt-4 text-sm text-gray-600 line-clamp-3">{p.bio}</p>}

            <div className="mt-4">
              <h4 className="text-xs font-medium text-gray-500">TOP SKILLS</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {(p.skills || []).slice(0, 3).map((skill) => (
                  <Badge key={`${p.id}-skill-${skill}`} variant="outline" className="bg-gray-50">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-600">
              {typeof p.yearsExperience === "number" && <Badge variant="secondary">XP: {p.yearsExperience} yrs</Badge>}
              {p.availability && <Badge variant="secondary">{p.availability}</Badge>}
              {p.rate && <Badge variant="secondary">{p.rate}</Badge>}
            </div>

            <div className="mt-6">
              <Link href={`/professionals/${p.id}`}>
                <Button className="w-full" variant="outline">
                  View Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
