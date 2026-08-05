"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import type { MediaItem } from "../lib/types";
import { withBasePath } from "../lib/assetPath";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "./icons";

type Props = {
  items: MediaItem[];
  index: number;
  onIndexChange: (next: number) => void;
  onClose: () => void;
};

/**
 * Built on the native <dialog> element, which gives us the top layer, a real
 * modal backdrop and browser-managed focus containment for free.
 */
export default function Lightbox({ items, index, onIndexChange, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const item = items[index];
  const many = items.length > 1;

  const step = useCallback(
    (delta: number) => {
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    // Restore page scrolling is handled by the browser for <dialog>, but the
    // background can still scroll behind the modal on some engines.
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!many) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [many, step]);

  return (
    <dialog
      ref={dialogRef}
      // Escape fires `cancel`; clicking the backdrop closes too.
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      aria-label={item.caption ?? item.alt}
      className="m-auto max-h-[92vh] max-w-[min(92vw,72rem)] rounded-[2px] border border-line bg-paper p-0 text-ink backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between border-b border-line px-3 py-2">
          <span className="label">
            {index + 1} / {items.length}
          </span>
          <div className="flex items-center gap-1">
            {many && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous image"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-[2px] text-ink-muted transition-colors hover:bg-surface hover:text-ink"
                >
                  <ArrowLeftIcon />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next image"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-[2px] text-ink-muted transition-colors hover:bg-surface hover:text-ink"
                >
                  <ArrowRightIcon />
                </button>
              </>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="inline-flex h-9 w-9 items-center justify-center rounded-[2px] text-ink-muted transition-colors hover:bg-surface hover:text-ink"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        <Image
          src={withBasePath(item.src)}
          alt={item.alt}
          width={item.width}
          height={item.height}
          sizes="92vw"
          className="max-h-[75vh] w-auto object-contain"
        />

        {item.caption && (
          <p className="border-t border-line px-4 py-3 text-small text-ink-muted">{item.caption}</p>
        )}
      </div>
    </dialog>
  );
}
