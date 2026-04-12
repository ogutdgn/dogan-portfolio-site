import type { Metadata } from "next"
import { getBlogBySlug, urlFor } from "@ogutdgn/sanity-shared"
import BlogDetailClient from "@/components/blog-detail-client"
import { notFound } from "next/navigation"

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)
  if (!blog) return {}

  const imageUrl = blog.mainImage ? urlFor(blog.mainImage).width(1200).height(630).url() : undefined

  return {
    title: `${blog.title} | Dogan Ogut`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
      type: 'article',
      publishedTime: blog.publishedAt,
    },
    alternates: {
      canonical: `https://ogutdgn.com/blog/${slug}`,
    },
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)
  if (!blog) notFound()
  return <BlogDetailClient blog={blog} />
}
