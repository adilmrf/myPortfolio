import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PROFILE } from "../content/profile";
import { EXPERIENCE } from "../content/experience";
import { EDUCATION } from "../content/education";
import RECOMMENDATIONS from "../content/recommendations";
import RecommendationsCarousel from "../components/RecommendationsCarousel";
import { withBasePath } from "../lib/assetPath";

export const metadata: Metadata = {
  title: "Home - Adil Mahroof",
  description: "Home \u2014 brief CV-style summary for Adil Mahroof.",
  openGraph: {
    images: [new URL('./opengraph-image.svg', import.meta.url).toString()],
  } as any,
  twitter: {
    images: [new URL('./twitter-image.svg', import.meta.url).toString()],
  } as any,
};

export default function Home() {
  return (
    <section className="py-8">
      <div className="mb-6 flex flex-col md:flex-row-reverse items-center gap-6">
        <Image
          src={withBasePath("/media/headshot.jpeg")}
          alt="Headshot"
          width={176}
          height={176}
          className="w-36 h-36 md:w-44 md:h-44 rounded-full ring-4 ring-white/80 shadow-xl bg-white/90 object-cover transform transition-transform hover:scale-105"
        />
        <div className="text-center md:text-left md:flex-1">
          <h1 className="text-[48px] md:text-[60px] font-extrabold tracking-tight leading-tight">{PROFILE.name}</h1>
          <p className="text-[30px] text-zinc-700 mt-2">{PROFILE.headline}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-[28px] font-semibold">Highlights</h2>
        <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {PROFILE.highlights?.map((h) => (
            <div key={h.label} className="rounded-md border p-3 bg-white/90">
              <div className="text-[12px] text-zinc-500">{h.label}</div>
              <div className="text-[18px] font-semibold">{h.value}</div>
              {h.detail && <div className="text-[18px] text-zinc-600">{h.detail}</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-[28px] font-semibold">Education</h2>
        <div className="mt-4 space-y-3 text-[18px] text-zinc-700">
          {EDUCATION.map((e) => (
            <div key={e.id} className="flex items-start gap-3">
              {e.logo && (
                <Image
                  src={withBasePath(e.logo)}
                  alt={`${e.institution} logo`}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-md object-contain bg-white/90"
                />
              )}
              <div>
                <div className="font-medium">{e.degree}</div>
                <div className="text-zinc-600 text-[18px]">
                  {e.institution}
                </div>
                <div className="text-zinc-600 text-[18px]">
                  {e.startDate} {"\u2014"} {e.endDate ?? "Present"}
                </div>
                {e.notes && <div className="text-zinc-600 text-[16px]">{e.notes}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-[28px] font-semibold">Experience</h2>
        <div className="mt-4 space-y-3 text-[18px] text-zinc-700">
          {EXPERIENCE.slice(0, 4).map((e) => (
            <div key={e.id} className="flex items-start gap-3">
              {e.logo && (
                <Image
                  src={withBasePath(e.logo)}
                  alt={`${e.organization} logo`}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-md object-contain bg-white/90"
                />
              )}
              <div>
                <Link href="/experience" className="text-[18px] font-medium hover:underline">
                  {e.role} {"\u2014"} {e.organization}
                </Link>
                <div className="text-[12px] text-zinc-600">{e.startDate} {"\u2014"} {e.endDate ?? "Present"}</div>
              </div>
            </div>
          ))}
          <div className="mt-2">
            <Link href="/experience" className="text-blue-600 text-[14px]">See full experience</Link>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-[28px] font-semibold">Recommendations</h2>
        <div className="mt-4">
          <RecommendationsCarousel recommendations={RECOMMENDATIONS} comingSoon comingSoonLabel="Recommendations" />
        </div>
      </div>




    </section>
  );
}
