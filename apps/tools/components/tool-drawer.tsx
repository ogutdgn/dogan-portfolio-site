"use client";

import { useEffect, useState, useRef } from "react";
import { X, Github, ExternalLink } from "lucide-react";
import { PortableText } from "@portabletext/react";
import type { Tool } from "@/lib/types";
import { getLiveLinkLabel } from "@/lib/utils";

const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="font-sans text-muted text-sm leading-relaxed mb-3">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-sans text-text font-semibold text-sm mt-5 mb-2 pb-1 border-b border-border">{children}</h2>
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

interface ToolDrawerProps {
  tool: Tool | null;
  onClose: () => void;
}

export function ToolDrawer({ tool, onClose }: ToolDrawerProps) {
  const [displayedTool, setDisplayedTool] = useState<Tool | null>(null);
  const [contentSliding, setContentSliding] = useState(false);
  const isOpen = !!tool;
  const prevToolId = useRef<string | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    if (!tool) {
      // drawer closing — keep displayed tool until animation done
      setTimeout(() => setDisplayedTool(null), 300);
      return;
    }

    if (!displayedTool || prevToolId.current === null) {
      // first open
      setDisplayedTool(tool);
      prevToolId.current = tool._id;
      return;
    }

    if (prevToolId.current !== tool._id) {
      // switching tools — slide out then slide in new content
      setContentSliding(true);
      setTimeout(() => {
        setDisplayedTool(tool);
        prevToolId.current = tool._id;
        setContentSliding(false);
      }, 200);
    }
  }, [tool]);

  return (
    <div
      className={`
        fixed top-14 left-0 z-50 flex flex-col overflow-hidden
        bg-surface border-r border-neon/30
        h-[calc(100vh-3.5rem)]
        w-full md:w-[30%]
        will-change-transform
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {displayedTool && (
        <div
          className={`flex flex-col h-full transition-transform duration-200 ease-in-out ${
            contentSliding ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"
          }`}
        >
          {/* header */}
          <div className="flex items-start justify-between p-6 border-b border-border flex-shrink-0">
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-text text-base leading-snug">{displayedTool.title}</h2>
              {displayedTool.tagline && (
                <p className="text-muted text-xs mt-1 leading-relaxed">{displayedTool.tagline}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded border border-border text-muted hover:text-text hover:border-border-bright transition-all flex-shrink-0 ml-4"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {displayedTool.overview && (
              <p className="text-muted text-sm leading-relaxed">{displayedTool.overview}</p>
            )}

            {displayedTool.technologies && displayedTool.technologies.length > 0 && (
              <div>
                <h3 className="font-mono text-xs text-dim uppercase tracking-widest mb-2">Tech Stack</h3>
                <div className="flex flex-wrap gap-1.5">
                  {displayedTool.technologies.map((tech) => (
                    <span key={tech} className="text-xs text-dim font-mono bg-surface-2 border border-border px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {displayedTool.tags && displayedTool.tags.length > 0 && (
              <div>
                <h3 className="font-mono text-xs text-dim uppercase tracking-widest mb-2">Tags</h3>
                <div className="flex flex-wrap gap-1.5">
                  {displayedTool.tags.map((tag) => (
                    <span key={tag} className="text-xs text-muted font-mono px-2 py-0.5 rounded border border-border">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {displayedTool.demoVideoUrl && (
              <div>
                <h3 className="font-mono text-xs text-dim uppercase tracking-widest mb-2">Demo</h3>
                <div className="aspect-video rounded-lg overflow-hidden border border-border">
                  <iframe src={displayedTool.demoVideoUrl} className="w-full h-full" allowFullScreen />
                </div>
              </div>
            )}

            {displayedTool.content && (displayedTool.content as unknown[]).length > 0 && (
              <div>
                <h3 className="font-mono text-xs text-dim uppercase tracking-widest mb-3">Full Description</h3>
                <PortableText value={displayedTool.content as any} components={portableTextComponents} />
              </div>
            )}
          </div>

          {/* footer */}
          <div className="p-6 border-t border-border flex items-center gap-3 flex-shrink-0">
            {displayedTool.githubLink && (
              <a
                href={displayedTool.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-mono text-muted hover:text-text hover:border-border-bright transition-all"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
            {displayedTool.liveLink && (
              <a
                href={displayedTool.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neon/40 bg-neon/10 text-sm font-mono text-neon hover:bg-neon/20 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                {getLiveLinkLabel(displayedTool.toolType)}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
