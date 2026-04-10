import { getBlogBySlug } from "@/lib/sanity.queries"
import BlogDetailClient from "@/components/blog-detail-client"
import { notFound } from "next/navigation"

export const revalidate = 0

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = await getBlogBySlug(params.slug)
  if (!blog) notFound()
  return <BlogDetailClient blog={blog} />
}
