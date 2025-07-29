"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Calendar, Clock, ArrowRight } from "lucide-react"

export default function Blogs() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const blogs = [
    {
      id: 1,
      title: "Building a Real-time Chat Application with WebSockets",
      excerpt:
        "Learn how I built a scalable real-time chat application using Node.js, Socket.io, and React. This comprehensive guide covers everything from setup to deployment.",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Web Development",
      image: "/placeholder.svg?height=300&width=500&text=Chat+App",
      slug: "building-realtime-chat-websockets",
    },
    {
      id: 2,
      title: "Optimizing C++ Performance: Memory Management Techniques",
      excerpt:
        "Deep dive into advanced C++ memory management techniques that can significantly improve your application's performance. Includes practical examples and benchmarks.",
      date: "2024-01-08",
      readTime: "12 min read",
      category: "Systems Programming",
      image: "/placeholder.svg?height=300&width=500&text=C%2B%2B+Performance",
      slug: "cpp-memory-management-optimization",
    },
    {
      id: 3,
      title: "Creating a Custom Neural Network Framework from Scratch",
      excerpt:
        "Step-by-step guide to building your own neural network framework using C++ and CUDA. Learn the fundamentals of deep learning implementation.",
      date: "2024-01-01",
      readTime: "15 min read",
      category: "Machine Learning",
      image: "/placeholder.svg?height=300&width=500&text=Neural+Network",
      slug: "custom-neural-network-framework",
    },
    {
      id: 4,
      title: "Database Sharding Strategies for High-Traffic Applications",
      excerpt:
        "Explore different database sharding techniques and learn how to implement them effectively for applications that need to handle millions of requests.",
      date: "2023-12-25",
      readTime: "10 min read",
      category: "Database",
      image: "/placeholder.svg?height=300&width=500&text=Database+Sharding",
      slug: "database-sharding-strategies",
    },
    {
      id: 5,
      title: "Implementing OAuth 2.0 Authentication in Next.js",
      excerpt:
        "Complete guide to implementing secure OAuth 2.0 authentication in your Next.js applications with multiple providers and best security practices.",
      date: "2023-12-18",
      readTime: "7 min read",
      category: "Security",
      image: "/placeholder.svg?height=300&width=500&text=OAuth+2.0",
      slug: "oauth2-authentication-nextjs",
    },
  ]

  useEffect(() => {
    if (!isMounted) return

    const interval = setInterval(() => {
      handleNext()
    }, 4000)

    return () => clearInterval(interval)
  }, [isMounted])

  const handleNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % blogs.length)
      setIsTransitioning(false)
    }, 300)
  }

  const handlePrev = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + blogs.length) % blogs.length)
      setIsTransitioning(false)
    }, 300)
  }

  const handleBlogClick = (slug: string) => {
    if (typeof window !== "undefined") {
      window.location.href = `/blog/${slug}`
    }
  }

  const handleAllBlogsClick = () => {
    document.body.style.opacity = "0.8"
    if (typeof window !== "undefined") {
      setTimeout(() => {
        window.location.href = "/blogs"
      }, 100)
    }
  }

  // Always show 3 blogs on desktop, 1 on mobile - but determine this consistently
  const visibleCount = 3 // Default to 3, will be handled by CSS grid
  const visibleBlogs = Array.from({ length: visibleCount }, (_, i) => blogs[(currentIndex + i) % blogs.length])

  return (
    <section id="blogs" className="py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Articles</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
            {visibleBlogs.map((blog, index) => (
              <div
                key={`${blog.id}-${currentIndex}`}
                className={`group bg-card border border-border rounded-lg overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-xl hover:scale-[1.02] ${
                  isTransitioning ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
                } ${index >= 1 ? "hidden md:block" : ""} ${index >= 2 ? "hidden lg:block" : ""}`}
                onClick={() => handleBlogClick(blog.slug)}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={blog.image || "/placeholder.svg"}
                    alt={blog.title}
                    className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                      {blog.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(blog.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{blog.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{blog.excerpt}</p>

                  <div className="flex items-center text-primary text-sm font-medium">
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={handlePrev}
              disabled={isTransitioning}
              className="p-2 border border-border rounded-full hover:bg-muted transition-colors disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={isTransitioning}
              className="p-2 border border-border rounded-full hover:bg-muted transition-colors disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={handleAllBlogsClick}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
            >
              See All Blogs
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
