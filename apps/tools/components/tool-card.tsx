"use client";

import { Github, ExternalLink } from "lucide-react";
import type { Tool } from "@ogutdgn/sanity-shared";
import { getToolTypeMeta, getLiveLinkLabel, STATUS_META } from "@/lib/utils";

function StatusDot({ status }: { status: string }) {
  const meta = STATUS_META[status] ?? STATUS_META["active"];
  const isLive = status === "active" || status === "beta";
  return (
    <span className="flex items-center gap-1.5">
      <span className="relative flex h-2 w-2">
        {isLive && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${meta.dot} opacity-60`} />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${meta.dot}`} />
      </span>
      <span className={`font-mono text-xs ${meta.color}`}>{meta.label}</span>
    </span>
  );
}

interface ToolCardProps {
  tool: Tool;
  onDetailsClick?: (tool: Tool) => void;
}

export function ToolCard({ tool, onDetailsClick }: ToolCardProps) {
  const typeMeta = getToolTypeMeta(tool.toolType);
  const hasDetails = tool.hostType === "external" && tool.content && (tool.content as unknown[]).length > 0;

  const handlePrimaryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (tool.hostType === "external" && tool.liveLink) {
      window.open(tool.liveLink, "_blank");
    } else if (tool.hostType === "internal") {
      window.location.href = `/${tool.slug.current}`;
    }
  };

  return (
    <article className="relative flex flex-col h-full bg-surface border border-border rounded-xl p-5 transition-all duration-300 hover:border-border-bright hover:-translate-y-0.5">

      {/* header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h2 className="font-semibold text-text text-sm leading-tight">
            {tool.title}
          </h2>
          <div className="mt-1">
            <span className={`inline-flex items-center px-2 py-0.5 rounded border text-xs font-mono font-medium ${typeMeta.bg} ${typeMeta.color}`}>
              {typeMeta.label}
            </span>
          </div>
        </div>
        <StatusDot status={tool.status} />
      </div>

      {/* tagline */}
      {tool.tagline && (
        <p className="text-muted text-xs leading-relaxed mb-4 flex-1">
          {tool.tagline}
        </p>
      )}

      {/* tech stack */}
      {tool.technologies && tool.technologies.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {tool.technologies.slice(0, 5).map((tech) => (
            <span key={tech} className="text-xs text-dim font-mono bg-surface-2 border border-border px-1.5 py-0.5 rounded">
              {tech}
            </span>
          ))}
          {tool.technologies.length > 5 && (
            <span className="text-xs text-dim font-mono">+{tool.technologies.length - 5}</span>
          )}
        </div>
      )}

      {/* footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-border mt-auto">
        <div className="flex items-center gap-2">
          {/* github */}
          {tool.githubLink && (
            <a
              href={tool.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-border text-xs font-mono text-muted hover:text-text hover:border-border-bright transition-all"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
          )}

          {/* details drawer (external only, if has content) */}
          {hasDetails && (
            <button
              onClick={(e) => { e.stopPropagation(); onDetailsClick?.(tool); }}
              className="px-3 py-1.5 rounded border border-border text-xs font-mono text-muted hover:text-text hover:border-border-bright transition-all"
            >
              Details
            </button>
          )}
        </div>

        {/* primary action */}
        {(tool.liveLink || tool.hostType === "internal") && (
          <button
            onClick={handlePrimaryClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-mono text-muted hover:text-text hover:border-border-bright transition-all whitespace-nowrap"
          >
            {tool.hostType === "internal" ? "Open" : getLiveLinkLabel(tool.toolType)}
            <ExternalLink className="w-3 h-3" />
          </button>
        )}
      </div>
    </article>
  );
}
