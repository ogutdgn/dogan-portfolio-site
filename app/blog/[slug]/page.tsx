"use client"


import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react"
import { ClipLoader } from "react-spinners"
import { useParams } from "next/navigation"
import { getBlogBySlug } from "@/lib/sanity.queries"
import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/components/portable-text-components'
import { useEffect, useState } from "react"
import { urlForImage } from "@/lib/sanity.image"
import Footer from "../components/footer"



export default function BlogDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [blog, setBlog] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBlog() {
      try {
        const data = await getBlogBySlug(slug)
        setBlog(data)
      } catch (err) {
        setBlog(null)
      } finally {
        setLoading(false)
      }
    }
    fetchBlog()
  }, [slug])

  const handleBackClick = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/blogs"
    }
  }

  const handleShareClick = () => {
    if (!blog) return
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <ClipLoader color="#6366f1" size={60} speedMultiplier={0.8} />
          <p className="text-muted-foreground text-lg">Loading blog...</p>
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground text-lg">Blog not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackClick}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back
            </button>
            <button
              onClick={handleShareClick}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Share2 className="h-5 w-5" />
              Share
            </button>
          </div>
        </div>
      </header>

      {/* Blog Detail */}
      <article className="max-w-4xl mx-auto px-6 sm:px-8 py-12">
        {/* Blog Header */}
        <header className="mb-12">
          <div className="mb-6">
            <span className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full">{blog.mainCategory || "Uncategorized"}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{blog.title}</h1>

          <div className="flex items-center gap-6 text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : ""}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{blog.readingTime || 5} min read</span>
            </div>
          </div>

          <img
            src={blog.mainImage ? urlForImage(blog.mainImage).url() : "/placeholder.jpg"}
            alt={blog.title}
            className="w-full h-64 md:h-80 object-cover rounded-lg"
          />
        </header>

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none">
          {Array.isArray(blog.content) && blog.content.length > 0 ? (
            <PortableText value={blog.content} components={portableTextComponents} />
          ) : blog.body ? (
            <div dangerouslySetInnerHTML={{ __html: blog.body }} />
          ) : blog.description ? (
            <p className="leading-relaxed">{blog.description}</p>
          ) : (
            <p className="text-muted-foreground">No content available for this blog post.</p>
          )}
        </div>
      </article>
      <Footer />
    </div>
  )
}
