"use client";

import { useState } from "react";
import Image from "next/image";
import type { MediaItem } from "../lib/types";
import { withBasePath } from "../lib/assetPath";
import Lightbox from "./Lightbox";

const KIND_LABEL: Record<NonNullable<MediaItem["kind"]>, string> = {
  photo: "Photo",
  cad: "CAD",
  plot: "Plot",
  diagram: "Diagram",
};

export default function Gallery({ items }: { items: MediaItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (items.length === 0) return null;

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2">
        {items.map((item, i) => (
          <li key={item.src}>
            <figure className="h-full">
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group relative block w-full overflow-hidden rounded-[2px] border border-line bg-surface"
              >
                <Image
                  src={withBasePath(item.src)}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="w-full transition-transform duration-300 group-hover:scale-[1.02]"
                />
                {item.kind && (
                  <span className="absolute left-2 top-2 rounded bg-paper/85 px-1.5 py-0.5 font-mono text-label uppercase tracking-[0.08em] text-ink-muted backdrop-blur-sm">
                    {KIND_LABEL[item.kind]}
                  </span>
                )}
                <span className="sr-only">Open larger view</span>
              </button>
              {item.caption && (
                <figcaption className="mt-2 text-small text-ink-subtle">{item.caption}</figcaption>
              )}
            </figure>
          </li>
        ))}
      </ul>

      {openIndex !== null && (
        <Lightbox
          items={items}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}
