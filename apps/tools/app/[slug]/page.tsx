import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft, Github, ExternalLink, Globe, Tag, Cpu } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { getToolBySlug, getAllTools } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import { getToolTypeMeta, STATUS_META } from "@/lib/utils";
import { TOOL_COMPONENTS } from "./tools";

export const revalidate = 30;

export async function generateStaticParams() {
  const tools = await getAllTools();
  return tools
    .filter((t) => t.hostType === "internal")
    .map((t) => ({ slug: t.slug.current }));
}

function Pill({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md border font-mono text-xs ${className}`}>
      {children}
    </span>
  );
}

const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="font-sans text-muted text-sm leading-relaxed mb-3">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-sans text-text font-semibold text-base mt-6 mb-2 pb-1 border-b border-border">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-mono text-dim font-medium text-xs uppercase tracking-widest mt-4 mb-2">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="font-sans border-l-2 border-neon/40 pl-3 text-muted text-sm italic mb-3">{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="text-text font-semibold">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="font-mono text-xs bg-surface-2 border border-border px-1 py-0.5 rounded text-neon">{children}</code>
    ),
    link: ({ value, children }: { value?: { href: string }; children?: React.ReactNode }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-neon underline underline-offset-2 hover:text-neon/80">
        {children}
      </a>
    ),
  },
};

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);
  if (!tool) notFound();

  const typeMeta = getToolTypeMeta(tool.toolType);
  const statusMeta = STATUS_META[tool.status] ?? STATUS_META["active"];

  return (
    <div className="max-w-4xl mx-auto px-6 pt-24 pb-16">

      <Link
        href="/"
        className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-text transition-colors mb-10 group"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
        back to tools
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">

        {/* left */}
        <div>
          {/* header */}
          <div className="flex items-start gap-4 mb-6">
            {tool.icon ? (
              <div className="w-14 h-14 rounded-xl border border-border overflow-hidden flex-shrink-0">
                <Image
                  src={urlFor(tool.icon).width(112).height(112).url()}
                  alt={tool.title}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className={`w-14 h-14 rounded-xl border flex items-center justify-center flex-shrink-0 ${typeMeta.bg}`}>
                <Globe className={`w-6 h-6 ${typeMeta.color}`} />
              </div>
            )}

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Pill className={`${typeMeta.bg} ${typeMeta.color}`}>{typeMeta.label}</Pill>
                <span className="flex items-center gap-1.5">
                  {(tool.status === "active" || tool.status === "beta") && (
                    <span className="relative flex h-2 w-2">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${statusMeta.dot} opacity-60`} />
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${statusMeta.dot}`} />
                    </span>
                  )}
                  <span className={`font-mono text-xs ${statusMeta.color}`}>{statusMeta.label}</span>
                </span>
              </div>
              <h1 className="text-2xl font-bold text-text">{tool.title}</h1>
              {tool.tagline && <p className="text-muted text-sm mt-1">{tool.tagline}</p>}
            </div>
          </div>

          {tool.overview && (
            <p className="text-muted leading-relaxed mb-8 text-sm border-l-2 border-neon/40 pl-4">
              {tool.overview}
            </p>
          )}

          {tool.coverImage && (
            <div className="rounded-xl overflow-hidden border border-border mb-8">
              <Image
                src={urlFor(tool.coverImage).width(1200).height(600).url()}
                alt={tool.title}
                width={1200}
                height={600}
                className="w-full object-cover"
              />
            </div>
          )}

          {tool.content && (tool.content as unknown[]).length > 0 && (
            <div className="mb-8">
              <PortableText value={tool.content as any} components={portableTextComponents} />
            </div>
          )}

          {tool.screenshots && tool.screenshots.length > 0 && (
            <div className="mb-8">
              <h2 className="font-mono text-xs text-dim uppercase tracking-widest mb-4">Screenshots</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tool.screenshots.map((s: any, i: number) => (
                  <div key={i} className="rounded-lg overflow-hidden border border-border">
                    <Image
                      src={urlFor(s).width(800).height(450).url()}
                      alt={s.caption ?? `Screenshot ${i + 1}`}
                      width={800}
                      height={450}
                      className="w-full object-cover"
                    />
                    {s.caption && (
                      <p className="text-xs text-dim font-mono px-3 py-2 bg-surface">{s.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {tool.demoVideoUrl && (
            <div className="mb-8">
              <h2 className="font-mono text-xs text-dim uppercase tracking-widest mb-4">Demo</h2>
              <div className="aspect-video rounded-xl overflow-hidden border border-border">
                <iframe src={tool.demoVideoUrl} className="w-full h-full" allowFullScreen />
              </div>
            </div>
          )}

          {(() => {
            const EmbeddedTool = TOOL_COMPONENTS[tool.slug.current];
            if (!EmbeddedTool) return null;
            return (
              <div className="mb-8">
                <h2 className="font-mono text-xs text-dim uppercase tracking-widest mb-4">Try it</h2>
                <Suspense fallback={
                  <div className="rounded-xl border border-border bg-surface h-32 flex items-center justify-center">
                    <span className="font-mono text-xs text-dim">Loading tool…</span>
                  </div>
                }>
                  <EmbeddedTool />
                </Suspense>
              </div>
            );
          })()}
        </div>

        {/* right sidebar */}
        <div className="space-y-4">

          {/* links */}
          <div className="space-y-2">
            {tool.liveLink && tool.hostType !== "internal" && (
              <a
                href={tool.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-neon/40 bg-neon/10 hover:bg-neon/20 transition-all group"
              >
                <ExternalLink className="w-4 h-4 text-neon" />
                <span className="font-mono text-sm text-neon">Open Tool</span>
              </a>
            )}
            {tool.githubLink && (
              <a
                href={tool.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border bg-surface hover:border-border-bright transition-all group"
              >
                <Github className="w-4 h-4 text-muted group-hover:text-text transition-colors" />
                <span className="font-mono text-sm text-muted group-hover:text-text transition-colors">GitHub</span>
              </a>
            )}
          </div>

          {tool.technologies && tool.technologies.length > 0 && (
            <div className="p-4 bg-surface border border-border rounded-xl">
              <p className="font-mono text-xs text-dim mb-3 flex items-center gap-1.5">
                <Cpu className="w-3 h-3" /> built with
              </p>
              <div className="flex flex-wrap gap-1.5">
                {tool.technologies.map((t: string) => (
                  <span key={t} className="font-mono text-xs text-muted bg-surface-2 border border-border px-2 py-1 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {tool.tags && tool.tags.length > 0 && (
            <div className="p-4 bg-surface border border-border rounded-xl">
              <p className="font-mono text-xs text-dim mb-3 flex items-center gap-1.5">
                <Tag className="w-3 h-3" /> tags
              </p>
              <div className="flex flex-wrap gap-1.5">
                {tool.tags.map((t: string) => (
                  <span key={t} className="font-mono text-xs text-dim px-2 py-1 rounded border border-border">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {tool.publishedAt && (
            <p className="font-mono text-xs text-dim px-1">
              published <span className="text-muted">{tool.publishedAt}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
