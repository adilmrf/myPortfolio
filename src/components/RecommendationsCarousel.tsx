"use client";
import React from "react";

type Recommendation = {
    name: string;
    title: string;
    affiliation: string;
    email: string;
};

type Props = {
    recommendations: Recommendation[];
    comingSoon?: boolean;
    comingSoonLabel?: string;
};

export default function RecommendationsCarousel({ recommendations, comingSoon = false, comingSoonLabel = "Coming soon" }: Props) {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const autoplayRef = React.useRef<number | null>(null);
    const cardWidthRef = React.useRef<number>(0);
    const [index, setIndex] = React.useState<number>(1); // start at first real item
    const [isPaused, setIsPaused] = React.useState(false);
    const isComingSoon = comingSoon;
    const comingSoonRef = React.useRef(isComingSoon);

    if (!recommendations || recommendations.length === 0) return null;

    // build extended list with clones at ends to allow seamless loop
    const extended = recommendations.length > 1
        ? [recommendations[recommendations.length - 1], ...recommendations, recommendations[0]]
        : recommendations;

    const measureCard = React.useCallback(() => {
        const el = containerRef.current;
        if (!el) return;
        const firstReal = el.querySelector<HTMLElement>("[data-reco-index=\"1\"]");
        const w = firstReal ? firstReal.offsetWidth : Math.floor(el.clientWidth * 0.8);
        cardWidthRef.current = w;
    }, []);

    const scrollToIndex = (i: number, behavior: ScrollBehavior = "smooth") => {
        const el = containerRef.current;
        if (!el) return;
        const left = Math.round(cardWidthRef.current * i);
        el.scrollTo({ left, behavior });
    };

    // initialize measurements and position at first real item
    React.useEffect(() => {
        measureCard();
        const el = containerRef.current;
        if (!el) return;
        // position to first real
        setTimeout(() => {
            // ensure measurement again after layout
            measureCard();
            el.scrollLeft = cardWidthRef.current * 1;
            setIndex(1);
        }, 0);

        const onResize = () => {
            measureCard();
            // snap to current index after resize
            scrollToIndex(index, "auto");
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // handle autoplay
    React.useEffect(() => {
        if (isPaused || comingSoonRef.current || recommendations.length <= 1) return;
        autoplayRef.current = window.setInterval(() => {
            setIndex((i) => i + 1);
        }, 3000);
        return () => {
            if (autoplayRef.current) window.clearInterval(autoplayRef.current);
        };
    }, [isPaused, recommendations.length]);

    React.useEffect(() => {
        comingSoonRef.current = isComingSoon;
        if (isComingSoon && autoplayRef.current) {
            window.clearInterval(autoplayRef.current);
            autoplayRef.current = null;
        }
    }, [isComingSoon]);

    // when index changes, scroll and handle loop reset
    React.useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        // ensure we have measurement
        if (!cardWidthRef.current) measureCard();
        scrollToIndex(index, "smooth");

        // if moved to the cloned first at end, jump to real first
        const lastIndex = extended.length - 1;
        if (index === lastIndex) {
            // after animation completes, reset without animation
            const t = setTimeout(() => {
                el.scrollTo({ left: cardWidthRef.current * 1, behavior: "auto" });
                setIndex(1);
            }, 420);
            return () => clearTimeout(t);
        }

        // if moved to the cloned last at start, jump to real last
        if (index === 0) {
            const realLast = extended.length - 2;
            const t = setTimeout(() => {
                el.scrollTo({ left: cardWidthRef.current * realLast, behavior: "auto" });
                setIndex(realLast);
            }, 420);
            return () => clearTimeout(t);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index]);

    const prev = () => setIndex((i) => i - 1);
    const next = () => setIndex((i) => i + 1);

    return (
        <div className="group">
            <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
                <div className={isComingSoon ? "blur-sm pointer-events-none" : undefined} aria-hidden={isComingSoon}>
                <button
                    aria-label="Scroll left"
                    onClick={prev}
                    className="absolute md:-left-4 left-0 top-1/2 -translate-y-1/2 z-20 md:inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border shadow-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto"
                >
                    ‹
                </button>

                <div
                    ref={containerRef}
                    className="flex gap-4 overflow-x-auto hide-scrollbar py-2 snap-x snap-mandatory"
                    style={{ WebkitOverflowScrolling: "touch" as any, msOverflowStyle: "none", scrollbarWidth: "none" as any }}
                >
                    {extended.map((r, idx) => {
                        // compute a stable key (cloned items use idx)
                        const key = `${r.email}-${idx}`;
                        // index mapping for data attribute: real items are 1..n
                        const dataIndex = idx;
                        return (
                            <article
                                key={key}
                                data-reco-index={dataIndex}
                                className="snap-start rounded-md border p-4 bg-white/90 shadow-sm dark:bg-zinc-900 dark:border-zinc-800"
                                style={{ flex: "0 0 calc(100% - 64px)", maxWidth: 520 }}
                            >
                                <div className="text-lg font-semibold">{r.name}</div>
                                <div className="text-sm text-zinc-600 dark:text-zinc-400">{r.title}</div>
                                <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">{r.affiliation}</div>
                                <div className="text-sm text-blue-600 dark:text-blue-400 mt-3">{r.email}</div>
                            </article>
                        );
                    })}
                </div>

                <button
                    aria-label="Scroll right"
                    onClick={next}
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

