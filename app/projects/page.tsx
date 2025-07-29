"use client"

import { useState } from "react"
import { ArrowLeft, Search, Calendar, Filter } from "lucide-react"

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

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [activeTab, setActiveTab] = useState("projects")

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      excerpt:
        "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
      date: "2024-01-20",
      category: "Web Development",
      image: "/placeholder.svg?height=300&width=500&text=E-Commerce+Platform",
      slug: "ecommerce-platform",
      tags: ["C++", "Qt", "SQLite", "CMake"],
    },
    {
      id: 2,
      title: "Task Management System",
      excerpt: "A collaborative task management application with real-time updates and team workspaces.",
      date: "2024-01-15",
      category: "Web Application",
      image: "/placeholder.svg?height=300&width=500&text=Task+Management",
      slug: "task-management-system",
      tags: ["Java", "Spring Boot", "React", "PostgreSQL"],
    },
    {
      id: 3,
      title: "System Resource Monitor",
      excerpt: "A comprehensive system monitoring tool with real-time analytics and performance tracking.",
      date: "2024-01-10",
      category: "Systems Programming",
      image: "/placeholder.svg?height=300&width=500&text=System+Monitor",
      slug: "system-resource-monitor",
      tags: ["C++", "Python", "Qt", "Linux"],
    },
    {
      id: 4,
      title: "Compiler Design Project",
      excerpt: "A custom programming language compiler with advanced optimization features.",
      date: "2024-01-05",
      category: "Systems Programming",
      image: "/placeholder.svg?height=300&width=500&text=Compiler+Design",
      slug: "compiler-design-project",
      tags: ["C", "LLVM", "Assembly", "Python"],
    },
    {
      id: 5,
      title: "Distributed Database System",
      excerpt: "A distributed database system with high availability and fault tolerance.",
      date: "2023-12-30",
      category: "Database",
      image: "/placeholder.svg?height=300&width=500&text=Distributed+DB",
      slug: "distributed-database-system",
      tags: ["C++", "Rust", "gRPC", "Redis"],
    },
    {
      id: 6,
      title: "Neural Network Framework",
      excerpt: "A deep learning framework with CUDA acceleration and optimization features.",
      date: "2023-12-25",
      category: "Machine Learning",
      image: "/placeholder.svg?height=300&width=500&text=Neural+Network",
      slug: "neural-network-framework",
      tags: ["C++", "CUDA", "Python", "CMake"],
    },
  ]

  const categories = [
    "All",
    "Web Development",
    "Web Application",
    "Systems Programming",
    "Database",
    "Machine Learning",
  ]

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleProjectClick = (slug: string) => {
    if (typeof window !== "undefined") {
      window.location.href = `/project/${slug}`
    }
  }

  const handleBackClick = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/"
    }
  }

  const handleTabChange = (tab: string) => {
    if (tab === "blogs") {
      // Add loading state before navigation
      document.body.style.opacity = "0.8"
      if (typeof window !== "undefined") {
        setTimeout(() => {
          window.location.href = "/blogs"
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
                placeholder="Search projects..."
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
            {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-card border border-border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
              onClick={() => handleProjectClick(project.slug)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(project.date).toLocaleDateString()}</span>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{project.excerpt}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No projects found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  )
}
