"use client";
import Link from "next/link";
import React from "react";
import type { Project } from "../lib/types";
import MediaThumb from "./MediaThumb";

export default function ProjectListCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block rounded-md border bg-white/90 overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-300 transition-transform transform hover:-translate-y-1 hover:shadow-lg dark:bg-zinc-900 dark:border-zinc-800"
    >
      <div className="sm:flex">
        <div className="sm:w-40 sm:flex-shrink-0">
          <MediaThumb project={project} className="w-full h-full" />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">{project.title}</h3>
          <p className="text-sm text-zinc-700 mt-1 dark:text-zinc-300">{project.summary}</p>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex flex-wrap gap-2 text-xs text-zinc-600 dark:text-zinc-400">
              {project.tags.map((t) => (
                <span key={t} className="rounded bg-zinc-100 px-2 py-1 dark:bg-zinc-800">{t}</span>
              ))}
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400">View more</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

