export const revalidate = 3600;

import Image from "next/image";
import { FilterBar } from "@/components/filter-bar";
import { getAllTools, getAllCategories } from "@ogutdgn/sanity-shared";

export default async function HomePage() {
  const [tools, categories] = await Promise.all([getAllTools(), getAllCategories()]);

  const stats = [
    { label: "total tools", value: tools.length },
    { label: "active", value: tools.filter((t) => t.status === "active").length },
    { label: "open source", value: tools.filter((t) => t.githubLink).length },
  ];

  return (
    <>
      {/* ── DESKTOP: two-column split layout ── */}
      <div className="hidden md:flex h-[calc(100vh-3.5rem)] mt-14 overflow-hidden">

        {/* LEFT — grid: proportional rows (50% text / 35% image / 15% stats) */}
        <div className="w-[30%] flex-shrink-0 grid grid-rows-[50fr_35fr_15fr] px-8 py-8 border-r border-border">

          {/* Row 1: Text — 50% of panel height */}
          <div className="flex flex-col justify-start overflow-hidden pt-2">
            <span className="font-mono text-xs text-dim block mb-3">DOGAN OGUT / TOOLS</span>

            <h1 className="font-bold tracking-tight text-text leading-tight mb-3" style={{ fontSize: "clamp(0.875rem, 2.8vh, 2.25rem)" }}>
              Solutions that I have found to any kind of{" "}
              <span className="text-neon text-glow">problems in my life</span>{" "}
              <span className="text-muted">:D</span>
            </h1>

            <p className="text-muted leading-relaxed overflow-hidden" style={{ fontSize: "clamp(0.65rem, 1.3vh, 1rem)" }}>
              If you ask me, engineering is the ability to produce solutions to problems.
              Today we think AI does everything and maybe we fall into despair. Instead of
              being negatively affected by this AI wave, I aim to use AI while building
              solutions to my problems and in doing so, I develop my engineering ability
              to solve problems in everyday life. I encounter many problems in my daily
              computer life and I truly enjoy finding my own solutions to them. That&apos;s
              why I built this tools page to put the solutions I&apos;ve created here.
            </p>
          </div>

          {/* Row 2: Image — 35% of panel height */}
          <div className="flex items-center justify-center overflow-hidden pt-2 pb-6">
            <div
              className="relative"
              style={{ height: "100%", aspectRatio: "280 / 340", maxWidth: "100%" }}
            >
              <Image
                src="/dog1to.webp"
                alt="me"
                fill
                sizes="(max-width: 1280px) 20vw, 280px"
                className="object-contain drop-shadow-lg"
              />

              {/* "That's me!" — points to face */}
              <div className="absolute left-[-85px] top-[42%] flex items-center gap-1 z-10">
                <span className="font-mono text-neon rotate-[-4deg] inline-block whitespace-nowrap" style={{ fontSize: "clamp(0.5rem, 1.2vh, 0.75rem)" }}>That&apos;s me!</span>
                <svg width="52" height="16" viewBox="0 0 52 16" className="text-neon flex-shrink-0">
                  <path d="M2 8 Q26 5 48 8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  <path d="M48 8 L40 4 M48 8 L40 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* toilet paper annotation */}
              <div className="absolute right-[-115px] top-[5%] flex items-start gap-1 z-10">
                <svg width="50" height="24" viewBox="0 0 50 24" className="text-neon-yellow flex-shrink-0 mt-1">
                  <path d="M48 6 C 36 8, 20 12, 6 18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  <path d="M6 18 L14 19 M6 18 L11 11" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-mono text-neon-yellow leading-tight block w-24 rotate-[2deg]" style={{ fontSize: "clamp(0.5rem, 1.2vh, 0.75rem)" }}>
                  An example of a solution that I have found in my life
                </span>
              </div>
            </div>
          </div>

          {/* Row 3: Stats — 15% of panel height */}
          <div className="flex flex-col justify-end space-y-2 overflow-hidden">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center justify-between font-mono text-xs border-b border-border/50 pb-2">
                <span className="text-dim">{stat.label}</span>
                <span className="text-neon font-semibold">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — scrollable */}
        <div className="w-[70%] overflow-y-auto px-8 py-10">
          <FilterBar tools={tools} categories={categories} />
        </div>

      </div>

      {/* ── MOBILE: stacked layout ── */}
      <div className="md:hidden mt-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
        <div className="px-8 pt-10 pb-8 border-b border-border">
          <span className="font-mono text-xs text-dim block mb-5">DOGAN OGUT / TOOLS</span>
          <h1 className="text-3xl font-bold tracking-tight text-text leading-tight mb-4">
            Solutions that I have found to any kind of{" "}
            <span className="text-neon text-glow">problems in my life</span>{" "}
            <span className="text-muted">:D</span>
          </h1>
          <p className="text-muted text-sm leading-relaxed mb-6">
            If you ask me, engineering is the ability to produce solutions to problems.
            Today we think AI does everything and maybe we fall into despair. Instead of
            being negatively affected by this AI wave, I aim to use AI while building
            solutions to my problems — and in doing so, I develop my engineering ability
            to solve problems in everyday life. I encounter many problems in my daily
            computer life and I truly enjoy finding my own solutions to them. That&apos;s
            why I built this tools page — to put the solutions I&apos;ve created here.
          </p>

          {/* photo + annotations */}
          <div className="flex justify-center mb-6">
            <div className="relative" style={{ width: "140px" }}>
              <Image
                src="/dog1to.webp"
                alt="me"
                width={140}
                height={170}
                className="object-contain drop-shadow-lg"
              />

              {/* "That's me!" */}
              <div className="absolute left-[-70px] top-[40%] flex items-center gap-1 z-10">
                <span className="font-mono text-neon rotate-[-4deg] inline-block whitespace-nowrap" style={{ fontSize: "0.6rem" }}>That&apos;s me!</span>
                <svg width="36" height="12" viewBox="0 0 36 12" className="text-neon flex-shrink-0">
                  <path d="M2 6 Q18 4 32 6" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                  <path d="M32 6 L26 3 M32 6 L26 9" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* toilet paper annotation */}
              <div className="absolute right-[-70px] top-[5%] flex items-start gap-1 z-10">
                <svg width="32" height="18" viewBox="0 0 32 18" className="text-neon-yellow flex-shrink-0 mt-0.5">
                  <path d="M30 4 C 22 6, 12 10, 4 14" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                  <path d="M4 14 L10 14 M4 14 L8 9" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-mono text-neon-yellow leading-tight block w-16 rotate-[2deg]" style={{ fontSize: "0.6rem" }}>
                  An example of a solution
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="font-mono text-xs">
                <span className="text-neon font-semibold">{stat.value}</span>
                <span className="text-dim ml-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-8 py-8">
          <FilterBar tools={tools} categories={categories} />
        </div>
      </div>
    </>
  );
}
