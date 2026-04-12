import { getBlogs } from "@ogutdgn/sanity-shared"
import BlogsClient from "@/components/blogs-client"

export const revalidate = 0

export default async function BlogsPage() {
  const blogs = await getBlogs()
  return <BlogsClient blogs={blogs} />
}
