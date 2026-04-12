export type ToolStatus = "active" | "beta" | "coming-soon" | "archived";
export type HostType = "internal" | "external";
export type ToolType = "web-app" | "chrome-extension" | "vscode-extension" | "os-extension" | "cli-npm" | "other";

export interface ToolCategory {
  _id: string;
  title: string;
  slug: { current: string };
}

export interface Tool {
  _id: string;
  title: string;
  slug: { current: string };
  tagline?: string;
  overview?: string;
  icon?: { asset: { _ref: string } };
  category: ToolCategory;
  hostType: HostType;
  toolType: ToolType;
  status: ToolStatus;
  featured?: boolean;
  liveLink?: string;
  githubLink?: string;
  technologies?: string[];
  tags?: string[];
  // external only
  coverImage?: { asset: { _ref: string } };
  screenshots?: Array<{ asset: { _ref: string }; caption?: string }>;
  demoVideoUrl?: string;
  content?: unknown[];
  publishedAt?: string;
}
