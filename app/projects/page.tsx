"use client"

import { useState, useEffect, useMemo } from "react"
import { ClipLoader } from "react-spinners"
import { urlForImage } from "@/lib/sanity.image"
import { getProjects } from "@/lib/sanity.queries"
import { ArrowLeft, Search, Calendar, Filter, Github, ExternalLink } from "lucide-react"
import FilterDropdown from "@/components/ui/filter-dropdown"

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

interface Project {
  _id: string
  title: string
  slug: string
  overview: string
  image: any
  technologies: string[]
  projectType: string
  mainCategory: string
  tags: string[]
  githubLink?: string
  publishedAt?: string
  _createdAt: string
  liveLink?: string
}

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [activeTab, setActiveTab] = useState("projects")
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const fetchedProjects = await getProjects()
        console.log("Fetched projects:", fetchedProjects)
        setProjects(fetchedProjects)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching projects:', error)
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const categories = useMemo(() => {
    const mainCategories = projects.map(project => project.mainCategory).filter(Boolean)
    const uniqueCategories = Array.from(new Set(mainCategories))
    return ["All", ...uniqueCategories]
  }, [projects])

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.overview.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || project.mainCategory === selectedCategory
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
            <FilterDropdown
              options={categories}
              value={selectedCategory}
              onChange={setSelectedCategory}
              placeholder="Filter by category"
              icon={<Filter className="h-5 w-5" />}
            />
          </div>

          <p className="text-muted-foreground">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="flex justify-center">
              <ClipLoader color="#6366f1" size={60} speedMultiplier={0.8} />
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">There are no projects available at the moment.</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No projects found matching your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                className="group bg-card border border-border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                onClick={() => handleProjectClick(project.slug)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image ? urlForImage(project.image).url() : "/placeholder.jpg"}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                      {project.mainCategory || project.projectType || "Project"}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4" />
                    <span>{project.publishedAt ? new Date(project.publishedAt).toLocaleDateString() : (project._createdAt ? new Date(project._createdAt).toLocaleDateString() : "")}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.overview}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {(project.technologies || []).slice(0, 3).map((tag: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                        {tag}
                      </span>
                    ))}
                    {(project.technologies?.length || 0) > 3 && (
                      <span className="px-2 py-1 border border-border rounded text-xs">
                        +{(project.technologies?.length || 0) - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-primary text-sm font-medium">
                      View Project
                      <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <div className="flex gap-2">
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-muted-foreground hover:text-foreground text-xs px-2 py-1 border border-border rounded hover:bg-muted transition-colors flex items-center gap-1"
                        >
                          <Github className="h-3 w-3" />
                          GitHub
                        </a>
                      )}
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-muted-foreground hover:text-foreground text-xs px-2 py-1 border border-border rounded hover:bg-muted transition-colors flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No projects found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  )
}
