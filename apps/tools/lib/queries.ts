import { client } from "./sanity";
import type { Tool, ToolCategory } from "./types";

export async function getAllTools(): Promise<Tool[]> {
  return client.fetch(`
    *[_type == "tool" && defined(title) && defined(slug)] | order(featured desc, publishedAt desc) {
      _id, title, slug, tagline, overview,
      hostType, toolType, status, featured,
      icon, technologies, tags,
      liveLink, githubLink,
      "category": category->{ _id, title, slug },
      content, publishedAt
    }
  `);
}

export async function getAllCategories(): Promise<ToolCategory[]> {
  return client.fetch(`*[_type == "toolCategory"] | order(orderRank) { _id, title, slug }`);
}

export async function getToolBySlug(slug: string): Promise<Tool | null> {
  return client.fetch(`
    *[_type == "tool" && slug.current == $slug][0] {
      _id, title, slug, tagline, overview,
      hostType, toolType, status, featured,
      icon, coverImage, screenshots, demoVideoUrl,
      technologies, tags, liveLink, githubLink,
      "category": category->{ _id, title, slug },
      content, publishedAt
    }
  `, { slug });
}
