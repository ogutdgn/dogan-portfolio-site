"use client";

import Link from "next/link";
import { Terminal } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-md bg-void/80">
      <div className="w-full px-8 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded border border-neon/40 bg-neon/10 flex items-center justify-center group-hover:border-neon/80 group-hover:bg-neon/20 transition-all">
            <Terminal className="w-3.5 h-3.5 text-neon" />
          </div>
          <span className="font-mono text-sm font-medium text-text">
            tools<span className="text-neon">.</span>ogutdgn
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <a
            href="https://ogutdgn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-text transition-colors"
          >
            ← portfolio
          </a>
        </nav>
      </div>
    </header>
  );
}
