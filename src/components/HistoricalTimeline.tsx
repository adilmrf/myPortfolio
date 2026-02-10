"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useRef, useState, useEffect } from "react";
import type { EducationItem, ExperienceItem } from "../lib/types";
import { withBasePath } from "../lib/assetPath";

function TimelineSection({
    title,
    items,
    footer,
    compact,
    cardHeight,
}: {
    title: string;
    items: Array<{ id: string; position: "up" | "down" } & any>;
    footer?: ReactNode;
    compact?: boolean;
    cardHeight?: string;
}) {
    const itemWidth = compact ? 400 : 520;
    const minWidth = compact ? "min-w-[280px]" : "min-w-[380px]";
    const maxWidth = compact ? "max-w-[360px]" : "max-w-[520px]";
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const overlayScrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener("scroll", checkScroll);
            window.addEventListener("resize", checkScroll);
            return () => {
                container.removeEventListener("scroll", checkScroll);
                window.removeEventListener("resize", checkScroll);
            };
        }
    }, []);

    const scroll = (direction: "left" | "right") => {
        const scrollAmount = 400;
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
        if (overlayScrollRef.current) {
            overlayScrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="mt-6">
            <div className="flex items-center justify-between gap-4">
                <h3 className="text-[24px] font-semibold">{title}</h3>
                {footer}
            </div>
            {/* Desktop: Horizontal Timeline */}
            <div className="hidden md:block">
                <div className="relative mt-2 h-[400px] overflow-hidden group">
                    <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-zinc-200 dark:bg-zinc-800 z-0" />
                    <div
                        ref={scrollContainerRef}
                        className="absolute inset-0 overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar"
                    >
                        <div className="flex gap-4 h-full" style={{ width: `${items.length * itemWidth}px` }}>
                            {items.map((item, index) => (
                                <div key={item.id} className={`${minWidth} ${maxWidth} flex-shrink-0 snap-start`} />
                            ))}
                        </div>
                    </div>
                    <div className="absolute inset-0 pointer-events-none overflow-x-auto overflow-y-hidden hide-scrollbar" ref={overlayScrollRef}>
                        <div className="flex gap-4 h-full" style={{ width: `${items.length * itemWidth}px` }}>
                            {items.map((item, index) => (
                                <TimelineCard
                                    key={item.id}
                                    {...item}
                                    index={index}
                                    itemWidth={itemWidth}
                                    minWidth={minWidth}
                                    maxWidth={maxWidth}
                                    showNotes={!compact}
                                    cardHeight={cardHeight}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Scroll Arrows */}
                    {canScrollLeft && (
                        <button
                            onClick={() => scroll("left")}
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white dark:bg-zinc-800 shadow-md hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all opacity-0 group-hover:opacity-100"
                            aria-label="Scroll left"
                        >
                            <svg
                                className="w-5 h-5 text-zinc-700 dark:text-zinc-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}
                    {canScrollRight && (
                        <button
                            onClick={() => scroll("right")}
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white dark:bg-zinc-800 shadow-md hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all opacity-0 group-hover:opacity-100"
                            aria-label="Scroll right"
                        >
                            <svg
                                className="w-5 h-5 text-zinc-700 dark:text-zinc-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
            {/* Mobile: Vertical List */}
            <div className="block md:hidden mt-2 space-y-3">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="rounded-md border p-3 bg-white/90 dark:bg-zinc-900 dark:border-zinc-800"
                    >
                        <div className="flex items-start gap-2">
                            {item.logo && (
                                <Image
                                    src={withBasePath(item.logo)}
                                    alt={`${item.subtitle} logo`}
                                    width={36}
                                    height={36}
                                    className="h-8 w-8 rounded-md object-contain bg-white/90 dark:bg-zinc-900 flex-shrink-0 mt-1"
                                />
                            )}
                            <div className="flex-1 min-w-0">
                                <div className="text-[18px] font-medium">{item.title}</div>
                                <div className="text-[16px] text-zinc-600 dark:text-zinc-400">{item.subtitle}</div>
                                <div className="text-[14px] text-zinc-500 dark:text-zinc-500 mt-1">{item.dates}</div>
                                {!compact && item.grade && (
                                    <div className="text-[15px] text-zinc-600 dark:text-zinc-400 mt-1">{item.grade}</div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function TimelineCard({
    title,
    subtitle,
    dates,
    logo,
    notes,
    grade,
    position,
    index,
    itemWidth,
    minWidth,
    maxWidth,
    showNotes,
    cardHeight,
}: {
    title: string;
    subtitle: string;
    dates: string;
    logo?: string;
    notes?: string;
    grade?: string;
    position: "up" | "down";
    index: number;
    itemWidth: number;
    minWidth: string;
    maxWidth: string;
    showNotes?: boolean;
    cardHeight?: string;
}) {
    const isUp = position === "up";
    const stemHeight = 28;
    const cardGap = 16;
    const xOffset = index * itemWidth + 20;

    return (
        <div
            key={`${index}`}
            className={`absolute ${minWidth} ${maxWidth} top-1/2 -translate-y-1/2 pointer-events-auto`}
            style={{
                left: `${xOffset}px`,
            }}
        >
            {/* Stem */}
            <div
                className={`absolute left-4 w-px bg-zinc-300 dark:bg-zinc-700 ${isUp ? "bottom-full" : "top-full"
                    }`}
                style={{
                    height: `${stemHeight}px`,
                }}
            />

            {/* Date label on opposite side of line from card */}
            <div
                className={`absolute text-[16px] font-bold text-zinc-600 dark:text-zinc-400 whitespace-nowrap ${isUp ? "top-full" : "bottom-full"
                    }`}
                style={{
                    left: `-8px`,
                    marginTop: isUp ? `${stemHeight + 4}px` : 0,
                    marginBottom: isUp ? 0 : `${stemHeight + 4}px`,
                }}
            >
                {dates}
            </div>

            {/* Card */}
            <div
                className={`absolute left-0 right-0 rounded-md border p-3 bg-white/90 dark:bg-zinc-900 dark:border-zinc-800 flex flex-col justify-start ${isUp ? "bottom-full" : "top-full"
                    }`}
                style={{
                    height: cardHeight || "120px",
                    marginBottom: isUp ? `${cardGap}px` : 0,
                    marginTop: isUp ? 0 : `${cardGap}px`,
                }}
            >
                <div className="flex items-center gap-2 flex-1">
                    {logo && (
                        <Image
                            src={withBasePath(logo)}
                            alt={`${subtitle} logo`}
                            width={36}
                            height={36}
                            className="h-8 w-8 rounded-md object-contain bg-white/90 dark:bg-zinc-900 flex-shrink-0"
                        />
                    )}
                    <div className="min-w-0 flex-1">
                        <div className="text-[18px] font-medium leading-tight">{title}</div>
                        <div className="text-[16px] text-zinc-600 dark:text-zinc-400">{subtitle}</div>
                        {showNotes && grade && <div className="text-[15px] text-zinc-600 dark:text-zinc-400 mt-1">{grade}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function HistoricalTimeline({
    education,
    experience,
}: {
    education: EducationItem[];
    experience: ExperienceItem[];
}) {
    const educationItems = education.map((e, index) => ({
        id: e.id,
        title: e.degree,
        subtitle: e.institution,
        dates: `${e.startDate} - ${e.endDate ?? "Present"}`,
        logo: e.logo,
        notes: e.notes,
        grade: e.grade,
        position: (index % 2 === 0 ? "up" : "down") as "up" | "down",
    }));

    const experienceItems = experience.map((e, index) => ({
        id: e.id,
        title: e.role,
        subtitle: e.organization,
        dates: `${e.startDate} - ${e.endDate ?? "Present"}`,
        logo: e.logo,
        position: (index % 2 === 0 ? "up" : "down") as "up" | "down",
    }));

    return (
        <section className="mb-8">
            <TimelineSection title="Education" items={educationItems} cardHeight="160px" />

            <TimelineSection
                title="Experience"
                items={experienceItems}
                compact={true}
                footer={
                    <Link href="/experience" className="text-blue-600 text-[14px] dark:text-blue-400">
                        See full experience
                    </Link>
                }
            />
        </section>
    );
}
