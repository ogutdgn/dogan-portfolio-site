import type { Metadata } from "next"
import { getBlogs } from "@ogutdgn/sanity-shared"
import BlogsClient from "@/components/blogs-client"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Blog | Dogan Ogut",
  description: "Technical articles on software development, architecture, and engineering.",
  openGraph: {
    title: "Blog | Dogan Ogut",
    description: "Technical articles on software development, architecture, and engineering.",
    type: 'website',
  },
  alternates: {
    canonical: "https://ogutdgn.com/blogs",
  },
}

export default async function BlogsPage() {
  const blogs = await getBlogs()
  return <BlogsClient blogs={blogs} />
}
