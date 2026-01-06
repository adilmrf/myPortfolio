"use client";
import Link from "next/link";
import React from "react";
import type { Project } from "../lib/types";
import MediaThumb from "./MediaThumb";
import { withBasePath } from "../lib/assetPath";

export default function ProjectListCard({ project }: { project: Project }) {
  return (
    <Link
      href={withBasePath(`/projects/${project.id}`)}
      className="group block rounded-md border bg-white/90 overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-300 transition-transform transform hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="sm:flex">
        <div className="sm:w-40 sm:flex-shrink-0">
          <MediaThumb project={project} className="w-full h-full" />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg text-zinc-900">{project.title}</h3>
          <p className="text-sm text-zinc-700 mt-1">{project.summary}</p>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex flex-wrap gap-2 text-xs text-zinc-600">
              {project.tags.map((t) => (
                <span key={t} className="rounded bg-zinc-100 px-2 py-1">{t}</span>
              ))}
            </div>
            <div className="text-xs text-blue-600">View more</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

