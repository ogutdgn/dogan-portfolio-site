import type { MetadataRoute } from "next"
import { getBlogs, getProjects } from "@ogutdgn/sanity-shared"

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogs, projects] = await Promise.all([getBlogs(), getProjects()])

  const blogEntries = blogs.map((blog) => ({
    url: `https://ogutdgn.com/blog/${blog.slug}`,
    lastModified: blog.publishedAt ?? blog._createdAt,
  }))

  const projectEntries = projects.map((project) => ({
    url: `https://ogutdgn.com/project/${project.slug}`,
    lastModified: project.publishedAt ?? project._createdAt,
  }))

  return [
    { url: 'https://ogutdgn.com', lastModified: new Date().toISOString() },
    { url: 'https://ogutdgn.com/blogs', lastModified: new Date().toISOString() },
    { url: 'https://ogutdgn.com/projects', lastModified: new Date().toISOString() },
    ...blogEntries,
    ...projectEntries,
  ]
}
