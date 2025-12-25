import Image from "next/image";
import React from "react";
import type { Project } from "../lib/types";

export default function MediaThumb({ project, className = "" }: { project: Project; className?: string }) {
  const thumb = project.thumbnail ?? project.media?.find((m) => m.type === "image");

  if (thumb && (thumb as any).src) {
    return (
      <div className={`overflow-hidden rounded-md bg-zinc-50 ${className}`}>
        <Image src={(thumb as any).src} alt={(thumb as any).alt ?? project.title} width={520} height={320} className="object-cover w-full h-40 sm:h-28 lg:h-40" />
      </div>
    );
  }

  // Video fallback or empty placeholder
  if (project.media?.some((m) => m.type === "video")) {
    return (
      <div className={`flex items-center justify-center rounded-md bg-zinc-50 text-zinc-500 ${className}`} style={{ height: 160 }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 3v18l15-9L5 3z" fill="currentColor" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`rounded-md bg-zinc-50 flex items-center justify-center text-zinc-400 ${className}`} style={{ height: 160 }}>
      <div className="text-sm">No image</div>
    </div>
  );
}
