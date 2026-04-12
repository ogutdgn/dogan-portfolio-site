"use client";

import { useState } from "react";
import type { Tool, ToolCategory } from "@/lib/types";
import { ToolCard } from "./tool-card";
import { ToolDrawer } from "./tool-drawer";

interface FilterBarProps {
  tools: Tool[];
  categories: ToolCategory[];
}

export function FilterBar({ tools, categories }: FilterBarProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const filtered = activeCategory === "all"
    ? tools
    : tools.filter((t) => t.category?._id === activeCategory);

  return (
    <div>
      {/* category filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveCategory("all")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs transition-all ${
            activeCategory === "all"
              ? "bg-neon/15 border-neon/50 text-neon"
              : "bg-surface border-border text-muted hover:border-border-bright hover:text-text"
          }`}
        >
          All
          <span className={`text-xs ${activeCategory === "all" ? "text-neon/70" : "text-dim"}`}>
            {tools.length}
          </span>
        </button>

        {categories.map((cat) => {
          const count = tools.filter((t) => t.category?._id === cat._id).length;
          if (count === 0) return null;
          return (
            <button
              key={cat._id}
              onClick={() => setActiveCategory(cat._id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs transition-all ${
                activeCategory === cat._id
                  ? "bg-neon/15 border-neon/50 text-neon"
                  : "bg-surface border-border text-muted hover:border-border-bright hover:text-text"
              }`}
            >
              {cat.title}
              <span className={`text-xs ${activeCategory === cat._id ? "text-neon/70" : "text-dim"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="font-mono text-muted text-sm">no tools found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((tool) => (
            <ToolCard
              key={tool._id}
              tool={tool}
              onDetailsClick={setSelectedTool}
            />
          ))}
        </div>
      )}

      {/* drawer */}
      <ToolDrawer
        tool={selectedTool}
        onClose={() => setSelectedTool(null)}
      />
    </div>
  );
}
