import type { MetadataRoute } from "next"
import { getAllTools } from "@ogutdgn/sanity-shared"

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tools = await getAllTools()

  const toolEntries = tools.map((tool) => ({
    url: `https://tools.ogutdgn.com/${tool.slug.current}`,
    lastModified: tool.publishedAt ?? new Date().toISOString(),
  }))

  return [
    { url: 'https://tools.ogutdgn.com', lastModified: new Date().toISOString() },
    ...toolEntries,
  ]
}
