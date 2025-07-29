"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from "lucide-react"

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

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

  useEffect(() => {
    if (!isMounted) return

    const interval = setInterval(() => {
      handleNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [isMounted])

  const handleNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length)
      setIsTransitioning(false)
    }, 300)
  }

  const handlePrev = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
      setIsTransitioning(false)
    }, 300)
  }

  const handleProjectClick = (slug: string) => {
    if (typeof window !== "undefined") {
      window.location.href = `/project/${slug}`
    }
  }

  const handleAllProjectsClick = () => {
    document.body.style.opacity = "0.8"
    if (typeof window !== "undefined") {
      setTimeout(() => {
        window.location.href = "/projects"
      }, 100)
    }
  }

  // Always show 3 projects on desktop, 1 on mobile - but determine this consistently
  const visibleCount = 3 // Default to 3, will be handled by CSS grid
  const visibleProjects = Array.from({ length: visibleCount }, (_, i) => projects[(currentIndex + i) % projects.length])

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
            {visibleProjects.map((project, index) => (
              <div
                key={`${project.id}-${currentIndex}`}
                className={`group bg-card border border-border rounded-lg overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-xl hover:scale-[1.02] ${
                  isTransitioning ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
                } ${index >= 1 ? "hidden md:block" : ""} ${index >= 2 ? "hidden lg:block" : ""}`}
                onClick={() => handleProjectClick(project.slug)}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      View Details
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(project.date).toLocaleDateString()}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.excerpt}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-1 border border-border rounded text-xs">+{project.tags.length - 3}</span>
                    )}
                  </div>

                  <div className="flex items-center text-primary text-sm font-medium">
                    View Project
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
              onClick={handleAllProjectsClick}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
            >
              See All Projects
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
