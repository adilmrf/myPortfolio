"use client";
import React from "react";

type Recommendation = {
    name: string;
    title: string;
    affiliation: string;
    email: string;
    linkedin: string;
};

type Props = {
    recommendations: Recommendation[];
    comingSoon?: boolean;
    comingSoonLabel?: string;
};

export default function RecommendationsCarousel({ recommendations, comingSoon = false, comingSoonLabel = "Coming soon" }: Props) {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const trackRef = React.useRef<HTMLDivElement | null>(null);
    const autoplayRef = React.useRef<number | null>(null);
    const [offset, setOffset] = React.useState(0);
    const [cardWidth, setCardWidth] = React.useState(0);
    const [isPaused, setIsPaused] = React.useState(false);
    const [isResetting, setIsResetting] = React.useState(false);
    const isComingSoon = comingSoon;

    if (!recommendations || recommendations.length === 0) return null;

    // For single item, no carousel needed
    if (recommendations.length === 1) {
        const r = recommendations[0];
        return (
            <div className="py-2">
                <article className="rounded-md border p-4 bg-white/90 shadow-sm dark:bg-zinc-900 dark:border-zinc-800" style={{ maxWidth: 520 }}>
                    <div className="text-lg font-semibold">{r.name}</div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">{r.title}</div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">{r.affiliation}</div>
                    {/* <div className="text-sm text-blue-600 dark:text-blue-400 mt-3">{r.email}</div> */}
                    <div className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                        <a href={r.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                    </div>
                </article>
            </div>
        );
    }

    // Triple the recommendations for infinite loop
    const tripled = [...recommendations, ...recommendations, ...recommendations];
    const totalItems = recommendations.length;

    // Measure card width including gap
    React.useEffect(() => {
        const measure = () => {
            if (containerRef.current) {
                const card = containerRef.current.querySelector('article');
                if (card) {
                    const rect = card.getBoundingClientRect();
                    setCardWidth(rect.width + 16); // width + gap-4 (1rem = 16px)
                }
            }
        };

        const timer = setTimeout(measure, 50);
        window.addEventListener('resize', measure);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', measure);
        };
    }, []);

    // Initialize position to middle section
    React.useEffect(() => {
        if (cardWidth > 0 && offset === 0) {
            setOffset(totalItems * cardWidth);
        }
    }, [cardWidth, totalItems, offset]);

    // Handle infinite loop - reset position when at boundaries
    React.useEffect(() => {
        if (!cardWidth || isResetting) return;

        const currentPos = offset / cardWidth;

        // If we're at or past the last clone, reset to the corresponding real item
        if (currentPos >= totalItems * 2) {
            setIsResetting(true);
            setTimeout(() => {
                setOffset(totalItems * cardWidth);
                setIsResetting(false);
            }, 500);
        }
        // If we're before the first real item, reset to the corresponding clone
        else if (currentPos < totalItems) {
            setIsResetting(true);
            setTimeout(() => {
                setOffset((totalItems + (currentPos % totalItems)) * cardWidth);
                setIsResetting(false);
            }, 500);
        }
    }, [offset, cardWidth, totalItems, isResetting]);

    // Autoplay
    React.useEffect(() => {
        if (isPaused || isComingSoon || !cardWidth || isResetting) return;

        autoplayRef.current = window.setInterval(() => {
            setOffset((prev) => prev + cardWidth);
        }, 3000);

        return () => {
            if (autoplayRef.current) clearInterval(autoplayRef.current);
        };
    }, [isPaused, isComingSoon, cardWidth, isResetting]);

    const handleNext = () => {
        if (!cardWidth || isResetting) return;
        setOffset((prev) => prev + cardWidth);
    };

    const handlePrev = () => {
        if (!cardWidth || isResetting) return;
        setOffset((prev) => prev - cardWidth);
    };

    return (
        <div className="group">
            <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
                <div className={isComingSoon ? "blur-sm pointer-events-none" : undefined} aria-hidden={isComingSoon}>
                    <button
                        aria-label="Scroll left"
                        onClick={handlePrev}
                        className="absolute md:-left-4 left-0 top-1/2 -translate-y-1/2 z-20 md:inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border shadow-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto"
                    >
                        ‹
                    </button>

                    <div className="overflow-hidden py-2" ref={containerRef}>
                        <div
                            ref={trackRef}
                            className="flex gap-4"
                            style={{
                                transform: `translateX(-${offset}px)`,
                                transition: isResetting ? "none" : "transform 0.5s ease-in-out",
                            }}
                        >
                            {tripled.map((r, idx) => {
                                const key = `${r.email}-${idx}`;
                                return (
                                    <article
                                        key={key}
                                        className="rounded-md border p-4 bg-white/90 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 flex-shrink-0"
                                        style={{ width: "calc(100% - 64px)", maxWidth: 520 }}
                                    >
                                        <div className="text-lg font-semibold">{r.name}</div>
                                        <div className="text-sm text-zinc-600 dark:text-zinc-400">{r.title}</div>
                                        <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">{r.affiliation}</div>
                                        {/* <div className="text-sm text-blue-600 dark:text-blue-400 mt-3">{r.email}</div> */}
                                        <div className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                                            <a href={r.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>

                    <button
                        aria-label="Scroll right"
                        onClick={handleNext}
                        className="absolute md:-right-4 right-0 top-1/2 -translate-y-1/2 z-20 md:inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border shadow-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto"
                    >
                        ›
                    </button>
                </div>
                {isComingSoon && (
                    <div className="absolute inset-0 z-30 grid place-items-center rounded-md border border-dashed border-zinc-300 bg-white/70 backdrop-blur-sm">
                        <div className="text-center">
                            <div className="text-sm uppercase tracking-[0.2em] text-zinc-500">Coming soon</div>
                            <div className="text-lg font-semibold text-zinc-800">{comingSoonLabel}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

