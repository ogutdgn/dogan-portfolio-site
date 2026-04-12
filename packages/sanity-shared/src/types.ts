export type ToolStatus = 'active' | 'beta' | 'coming-soon' | 'archived';
export type HostType = 'internal' | 'external';
export type ToolType = 'web-app' | 'chrome-extension' | 'vscode-extension' | 'os-extension' | 'cli-npm' | 'other';

export interface ToolCategory {
  _id: string;
  title: string;
  slug: { current: string };
}

export interface BlogCategory {
  _id: string;
  title: string;
  slug: { current: string };
}

export interface ProjectCategory {
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
  coverImage?: { asset: { _ref: string } };
  screenshots?: Array<{ asset: { _ref: string }; caption?: string }>;
  demoVideoUrl?: string;
  content?: unknown[];
  publishedAt?: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  publishedAt?: string;
  description?: string;
  readingTime?: number;
  mainImage?: { asset: { _ref: string } };
  mainCategory?: BlogCategory;
  tags?: string[];
  content?: unknown[];
  _createdAt: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  overview?: string;
  image?: { asset: { _ref: string } };
  technologies?: string[];
  projectType?: string;
  mainCategory?: ProjectCategory;
  tags?: string[];
  githubLink?: string;
  liveLink?: string;
  description?: string;
  content?: unknown[];
  publishedAt?: string;
  _createdAt: string;
}
