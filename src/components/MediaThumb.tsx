import React from "react";
import type { Project } from "../lib/types";

export default function MediaThumb({ project, className = "" }: { project: Project; className?: string }) {
  return (
    <div className={`rounded-md bg-zinc-50 flex items-center justify-center text-zinc-400 ${className}`} style={{ height: 160 }}>
      <div className="text-xs font-medium text-zinc-500 px-3 text-center">{project.title}</div>
    </div>
  );
}
