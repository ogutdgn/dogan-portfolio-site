"use client"


import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Calendar, ArrowRight, Filter, Github, ExternalLink } from "lucide-react"
import { getProjects } from "@/lib/sanity.queries"
import { urlForImage } from "@/lib/sanity.image"
import { ClipLoader } from "react-spinners"
import FilterDropdown from "@/components/ui/filter-dropdown"

interface Project {
  _id: string
  title: string
  overview: string
  image: any
  technologies: string[]
  projectType: string
  mainCategory: string
  tags: string[]
  githubLink?: string
  liveLink?: string
  publishedAt?: string
  _createdAt: string
  slug: string
}

export default function Projects() {

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setIsMounted(true)
    async function fetchProjects() {
      try {
        const data = await getProjects()
        setProjects(data)
      } catch (err) {
        // Error handling
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])


  useEffect(() => {
    if (!isMounted || projects.length <= 1) return
    
    // Desktop: auto-scroll only if more than 3 projects
    // Mobile: auto-scroll if more than 1 project
    const shouldAutoScroll = isMobile ? projects.length > 1 : projects.length > 3
    
    if (!shouldAutoScroll) return
    
    const interval = setInterval(() => {
      handleNext()
    }, 5000)
    return () => clearInterval(interval)
  }, [isMobile, isMounted, projects.length])


  const handleNext = () => {
    if (isTransitioning || projects.length === 0) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1
        return nextIndex >= projects.length ? 0 : nextIndex
      })
      setIsTransitioning(false)
    }, 300)
  }

  const handlePrev = () => {
    if (isTransitioning || projects.length === 0) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => {
        const prevIndex = prev - 1
        return prevIndex < 0 ? projects.length - 1 : prevIndex
      })
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


  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  const visibleProjects = projects.length > 0 ? projects : []


  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="relative">
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
          ) : (
            <>
              {/* Desktop View */}
              <div className="hidden md:block">
                {projects.length <= 3 ? (
                  // Static view for 3 or fewer projects with centered layout
                  <div className={`grid ${
                    projects.length === 1 
                      ? 'grid-cols-1 place-items-center' 
                      : projects.length === 2 
                        ? 'grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'
                        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  }`}>
                    {projects.map((project, index) => (
                      <div
                        key={`${project._id || project.slug}-static`}
                        className="group bg-card border border-border rounded-lg overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-xl hover:scale-[1.02] w-full max-w-sm"
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
                            {(project.technologies || project.tags || []).slice(0, 3).map((tag: string, i: number) => (
                              <span key={i} className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                                {tag}
                              </span>
                            ))}
                            {(project.technologies?.length || project.tags?.length || 0) > 3 && (
                              <span className="px-2 py-1 border border-border rounded text-xs">
                                +{(project.technologies?.length || project.tags?.length || 0) - 3}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-primary text-sm font-medium">
                              View Project
                              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
                ) : (
                  // Carousel view for more than 3 projects
                  <div className="relative overflow-hidden">
                    <div 
                      className="flex transition-transform duration-300 ease-in-out"
                      style={{ transform: `translateX(-${currentIndex * (100/3)}%)` }}
                    >
                      {/* Create extended array for infinite scroll effect */}
                      {[...projects, ...projects.slice(0, 2)].map((project, index) => (
                        <div
                          key={`${project._id || project.slug}-carousel-${index}`}
                          className="w-1/3 flex-shrink-0 px-3"
                        >
                          <div
                            className="group bg-card border border-border rounded-lg overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-xl hover:scale-[1.02]"
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
                                {(project.technologies || project.tags || []).slice(0, 3).map((tag: string, i: number) => (
                                  <span key={i} className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                                    {tag}
                                  </span>
                                ))}
                                {(project.technologies?.length || project.tags?.length || 0) > 3 && (
                                  <span className="px-2 py-1 border border-border rounded text-xs">
                                    +{(project.technologies?.length || project.tags?.length || 0) - 3}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center text-primary text-sm font-medium">
                                  View Project
                                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
                    {projects.map((project, index) => (
                      <div
                        key={`${project._id || project.slug}-mobile-${index}`}
                        className="w-full flex-shrink-0"
                      >
                        <div
                          className="group bg-card border border-border rounded-lg overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-xl hover:scale-[1.02] mx-2"
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
                              {(project.technologies || project.tags || []).slice(0, 3).map((tag: string, i: number) => (
                                <span key={i} className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                                  {tag}
                                </span>
                              ))}
                              {(project.technologies?.length || project.tags?.length || 0) > 3 && (
                                <span className="px-2 py-1 border border-border rounded text-xs">
                                  +{(project.technologies?.length || project.tags?.length || 0) - 3}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-primary text-sm font-medium">
                                View Project
                                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Carousel Navigation - Desktop: only if more than 3 projects */}
          {projects.length > 3 && (
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

          {/* Carousel Navigation - Mobile: if more than 1 project */}
          {projects.length > 1 && (
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
