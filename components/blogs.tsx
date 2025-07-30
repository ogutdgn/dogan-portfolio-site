"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Calendar, Clock, ArrowRight } from "lucide-react"
import { getBlogs } from "@/lib/sanity.queries"
import { urlForImage } from "@/lib/sanity.image"
import { ClipLoader } from "react-spinners"

interface Blog {
  _id: string
  title: string
  description: string
  publishedAt: string
  readingTime: number
  mainImage: any
  categories: string[]
  mainCategory: string
  tags: string[]
  slug: string
}

export default function Blogs() {

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setIsMounted(true)
    async function fetchBlogs() {
      try {
        const data = await getBlogs()
        setBlogs(data)
      } catch (err) {
        // Error handling
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isMounted || blogs.length <= 1) return
    
    // Desktop: auto-scroll only if more than 3 blogs
    // Mobile: auto-scroll if more than 1 blog
    const shouldAutoScroll = isMobile ? blogs.length > 1 : blogs.length > 3
    
    if (!shouldAutoScroll) return
    
    const interval = setInterval(() => {
      handleNext()
    }, 4000)
    return () => clearInterval(interval)
  }, [isMobile, isMounted, blogs.length])


  const handleNext = () => {
    if (isTransitioning || blogs.length === 0) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => {
        const newIndex = prev + 1
        // Reset to 0 when we've shown all original items to create infinite loop effect
        if (newIndex >= blogs.length) {
          return 0
        }
        return newIndex
      })
      setIsTransitioning(false)
    }, 300)
  }

  const handlePrev = () => {
    if (isTransitioning || blogs.length === 0) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => {
        const newIndex = prev - 1
        // Loop to end when going back from start
        if (newIndex < 0) {
          return blogs.length - 1
        }
        return newIndex
      })
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


  const visibleBlogs = blogs.length > 0 ? blogs : []


  return (
    <section id="blogs" className="py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Articles</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="relative">
          {loading ? (
            <div className="text-center py-12">
              <div className="flex justify-center">
                <ClipLoader color="#6366f1" size={60} speedMultiplier={0.8} />
              </div>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">There are no blogs available at the moment.</p>
            </div>
          ) : (
            <>
              {/* Desktop View */}
              <div className="hidden md:block">
                {blogs.length <= 3 ? (
                  // Static view for 3 or fewer blogs with centered layout
                  <div className={`grid ${
                    blogs.length === 1 
                      ? 'grid-cols-1 place-items-center' 
                      : blogs.length === 2 
                        ? 'grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'
                        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  }`}>
                    {blogs.map((blog, index) => (
                      <div
                        key={`${blog._id}-static`}
                        className="group bg-card border border-border rounded-lg overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-xl hover:scale-[1.02] w-full max-w-sm"
                        onClick={() => handleBlogClick(blog.slug)}
                      >
                        <div className="relative overflow-hidden">
                          <img
                            src={blog.mainImage ? urlForImage(blog.mainImage).url() : "/placeholder.jpg"}
                            alt={blog.title}
                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                              {blog.mainCategory || blog.categories?.[0] || "Uncategorized"}
                            </span>
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : ""}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{blog.readingTime || 5} min read</span>
                            </div>
                          </div>

                          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{blog.title}</h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{blog.description}</p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {(blog.tags || []).slice(0, 3).map((tag: string, i: number) => (
                              <span key={i} className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                                {tag}
                              </span>
                            ))}
                            {(blog.tags?.length || 0) > 3 && (
                              <span className="px-2 py-1 border border-border rounded text-xs">
                                +{(blog.tags?.length || 0) - 3}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center text-primary text-sm font-medium">
                            Read More
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Carousel view for more than 3 blogs
                  <div className="relative overflow-hidden">
                    <div 
                      className="flex transition-transform duration-300 ease-in-out"
                      style={{ transform: `translateX(-${currentIndex * (100/3)}%)` }}
                    >
                      {/* Create extended array for infinite scroll effect */}
                      {[...blogs, ...blogs.slice(0, 2)].map((blog, index) => (
                        <div
                          key={`${blog._id}-carousel-${index}`}
                          className="w-1/3 flex-shrink-0 px-3"
                        >
                          <div
                            className="group bg-card border border-border rounded-lg overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-xl hover:scale-[1.02]"
                            onClick={() => handleBlogClick(blog.slug)}
                          >
                            <div className="relative overflow-hidden">
                              <img
                                src={blog.mainImage ? urlForImage(blog.mainImage).url() : "/placeholder.jpg"}
                                alt={blog.title}
                                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                                  {blog.mainCategory || blog.categories?.[0] || "Uncategorized"}
                                </span>
                              </div>
                            </div>

                            <div className="p-6">
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : ""}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{blog.readingTime || 5} min read</span>
                                </div>
                              </div>

                              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{blog.title}</h3>
                              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{blog.description}</p>

                              <div className="flex flex-wrap gap-2 mb-4">
                                {(blog.tags || []).slice(0, 3).map((tag: string, i: number) => (
                                  <span key={i} className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                                    {tag}
                                  </span>
                                ))}
                                {(blog.tags?.length || 0) > 3 && (
                                  <span className="px-2 py-1 border border-border rounded text-xs">
                                    +{(blog.tags?.length || 0) - 3}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center text-primary text-sm font-medium">
                                Read More
                                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile View */}
              <div className="block md:hidden">
                <div className="relative overflow-hidden">
                  <div 
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {blogs.map((blog, index) => (
                      <div
                        key={`${blog._id}-mobile-${index}`}
                        className="w-full flex-shrink-0"
                      >
                        <div
                          className="group bg-card border border-border rounded-lg overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-xl hover:scale-[1.02] mx-2"
                          onClick={() => handleBlogClick(blog.slug)}
                        >
                          <div className="relative overflow-hidden">
                            <img
                              src={blog.mainImage ? urlForImage(blog.mainImage).url() : "/placeholder.jpg"}
                              alt={blog.title}
                              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                                {blog.mainCategory || blog.categories?.[0] || "Uncategorized"}
                              </span>
                            </div>
                          </div>

                          <div className="p-6">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : ""}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{blog.readingTime || 5} min read</span>
                              </div>
                            </div>

                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{blog.title}</h3>
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{blog.description}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {(blog.tags || []).slice(0, 3).map((tag: string, i: number) => (
                                <span key={i} className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                                  {tag}
                                </span>
                              ))}
                              {(blog.tags?.length || 0) > 3 && (
                                <span className="px-2 py-1 border border-border rounded text-xs">
                                  +{(blog.tags?.length || 0) - 3}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center text-primary text-sm font-medium">
                              Read More
                              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Carousel Navigation - Desktop: only if more than 3 blogs */}
          {blogs.length > 3 && (
            <div className="hidden md:flex justify-center mt-8 gap-4">
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
          )}

          {/* Carousel Navigation - Mobile: if more than 1 blog */}
          {blogs.length > 1 && (
            <div className="flex md:hidden justify-center mt-8 gap-4">
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
          )}

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
