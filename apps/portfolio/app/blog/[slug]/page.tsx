import { getBlogBySlug } from "@ogutdgn/sanity-shared"
import BlogDetailClient from "@/components/blog-detail-client"
import { notFound } from "next/navigation"

export const revalidate = 0

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)
  if (!blog) notFound()
  return <BlogDetailClient blog={blog} />
}
