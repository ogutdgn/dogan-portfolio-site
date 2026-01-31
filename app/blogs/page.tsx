"use client"

import { useState, useEffect, useMemo } from "react"
import { getBlogs } from "@/lib/sanity.queries"
import { urlForImage } from "@/lib/sanity.image"
import { ArrowLeft, Search, Calendar, Clock, Filter } from "lucide-react"
import FilterDropdown from "@/components/ui/filter-dropdown"
import { ClipLoader } from "react-spinners"
import Footer from "../../components/footer"


interface NavigationToggleProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

function NavigationToggle({ activeTab, onTabChange }: NavigationToggleProps) {
  return (
    <div className="flex items-center bg-muted rounded-lg p-1">
      <button
        onClick={() => onTabChange("projects")}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          activeTab === "projects"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Projects
      </button>
      <button
        onClick={() => onTabChange("blogs")}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          activeTab === "blogs"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Blogs
      </button>
    </div>
  )
}



interface Blog {
  _id: string
  title: string
  description: string
  slug: string
  publishedAt: string
  readingTime: number
  mainImage: any
  mainCategory: string
  tags: string[]
}

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [activeTab, setActiveTab] = useState("blogs")
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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

  const categories = useMemo(() => {
    const mainCategories = blogs.map(blog => blog.mainCategory).filter(Boolean)
    const uniqueCategories = Array.from(new Set(mainCategories))
    return ["All", ...uniqueCategories]
  }, [blogs])

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || blog.mainCategory === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleBlogClick = (slug: string | { current: string }) => {
    const blogSlug = typeof slug === "string" ? slug : slug.current
    if (typeof window !== "undefined") {
      window.location.href = `/blog/${blogSlug}`
    }
  }

  const handleBackClick = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/"
    }
  }

  const handleTabChange = (tab: string) => {
    if (tab === "projects") {
      document.body.style.opacity = "0.8"
      if (typeof window !== "undefined") {
        setTimeout(() => {
          window.location.href = "/projects"
        }, 100)
      }
    }
    setActiveTab(tab)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackClick}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Portfolio
            </button>
            <div className="flex-1 flex justify-end md:justify-center">
              <NavigationToggle activeTab={activeTab} onTabChange={handleTabChange} />
            </div>
            <div className="hidden md:block w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <FilterDropdown
              options={categories}
              value={selectedCategory}
              onChange={setSelectedCategory}
              placeholder="Filter by category"
              icon={<Filter className="h-5 w-5" />}
            />
          </div>

          <p className="text-muted-foreground">
            {filteredBlogs.length} article{filteredBlogs.length !== 1 ? "s" : ""} found
          </p>
        </div>

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
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No blogs found matching your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
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
                      {blog.mainCategory || "Uncategorized"}
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
                  {blog.description && (
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{blog.description}</p>
                  )}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center text-primary text-sm font-medium">
                    Read More
                    <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No blogs found matching your criteria.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
