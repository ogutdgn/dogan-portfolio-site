"use client"

import { useState } from "react"
import { ArrowLeft, Search, Calendar, Clock, Filter } from "lucide-react"

// Navigation Toggle Component
function NavigationToggle({ activeTab, onTabChange }) {
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

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [activeTab, setActiveTab] = useState("blogs")

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

  const categories = ["All", "Web Development", "Systems Programming", "Machine Learning", "Database", "Security"]

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleBlogClick = (slug: string) => {
    if (typeof window !== "undefined") {
      window.location.href = `/blog/${slug}`
    }
  }

  const handleBackClick = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/"
    }
  }

  const handleTabChange = (tab: string) => {
    if (tab === "projects") {
      // Add loading state before navigation
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
            <div className="hidden md:block w-32"></div> {/* Spacer for centering on desktop */}
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
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-muted-foreground">
            {filteredBlogs.length} article{filteredBlogs.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="group bg-card border border-border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
              onClick={() => handleBlogClick(blog.slug)}
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
                <p className="text-muted-foreground text-sm">{blog.excerpt}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No blogs found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  )
}
