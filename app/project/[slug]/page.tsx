"use client"

import { ArrowLeft, Calendar, Clock, Share2, ExternalLink, Github } from "lucide-react"
import { ClipLoader } from "react-spinners"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getProject } from "@/lib/sanity.queries"
import { urlForImage } from "@/lib/sanity.image"
import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/components/portable-text-components'
import Footer from "../components/footer"

export default function ProjectDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [project, setProject] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProject() {
      try {
        const data = await getProject(slug)
        setProject(data)
      } catch (err) {
        setProject(null)
      } finally {
        setLoading(false)
      }
    }
    fetchProject()
  }, [slug])

  const handleBackClick = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/projects"
    }
  }

  const handleShareClick = () => {
    if (!project) return
    if (navigator.share) {
      navigator.share({
        title: project.title,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    if (!content) return null
    return content
      .split("\n")
      .map((line, index) => {
        if (line.startsWith("# ")) {
          return (
            <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{line.substring(2)}</h1>
          )
        }
        if (line.startsWith("## ")) {
          return (
            <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{line.substring(3)}</h2>
          )
        }
        if (line.startsWith("### ")) {
          return (
            <h3 key={index} className="text-xl font-bold mt-4 mb-2">{line.substring(4)}</h3>
          )
        }
        if (line.startsWith("```") ) {
          const language = line.substring(3)
          const codeLines = []
          let i = index + 1
          const linesArr = content.split("\n")
          while (i < linesArr.length && !linesArr[i].startsWith("```") ) {
            codeLines.push(linesArr[i])
            i++
          }
          return (
            <div key={index} className="my-6">
              <div className="bg-muted/50 border border-border rounded-lg overflow-hidden">
                <div className="bg-muted px-4 py-2 border-b border-border">
                  <span className="text-sm font-medium text-muted-foreground">{language || "code"}</span>
                </div>
                <pre className="p-4 overflow-x-auto">
                  <code className="text-sm font-mono">{codeLines.join("\n")}</code>
                </pre>
              </div>
            </div>
          )
        }
        if (
          line === "```" ||
          (index > 0 &&
            content
              .split("\n")
              .slice(0, index)
              .some(
                (prevLine, prevIndex) =>
                  prevLine.startsWith("```") &&
                  !content
                    .split("\n")
                    .slice(prevIndex + 1, index)
                    .some((l) => l.startsWith("```")),
              ))
        ) {
          return null
        }
        if (line.trim()) {
          return (
            <p key={index} className="mb-4 leading-relaxed">{line}</p>
          )
        }
        return <br key={index} />
      })
      .filter(Boolean)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <ClipLoader color="#6366f1" size={60} speedMultiplier={0.8} />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground text-lg">Project not found.</p>
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

      {/* Project Detail */}
      <article className="max-w-4xl mx-auto px-6 sm:px-8 py-12">
        {/* Project Header */}
        <header className="mb-12">
          <div className="mb-6">
            <span className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full">{project.projectType || project.category || "Uncategorized"}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{project.title}</h1>

          <div className="flex items-center gap-6 text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{project.publishedAt ? new Date(project.publishedAt).toLocaleDateString() : (project._createdAt ? new Date(project._createdAt).toLocaleDateString() : "")}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {(project.technologies || project.tags || []).map((tech: string, i: number) => (
              <span key={i} className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-sm">{tech}</span>
            ))}
          </div>

          {(project.githubLink || project.liveLink) && (
            <div className="flex gap-4 mb-8">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  View on GitHub
                </a>
              )}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              )}
            </div>
          )}

          <img
            src={project.image ? urlForImage(project.image).url() : "/placeholder.jpg"}
            alt={project.title}
            className="w-full h-64 md:h-80 object-cover rounded-lg mb-8"
          />
        </header>

        {/* Project Content */}
        <div className="prose prose-lg max-w-none mb-8">
          {project.overview && (
            <>
              <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">{project.overview}</p>
            </>
          )}
          
          {Array.isArray(project.content) && project.content.length > 0 ? (
            <PortableText value={project.content} components={portableTextComponents} />
          ) : project.description ? (
            <>
              <h2 className="text-2xl font-bold mb-4">Project Details</h2>
              {renderContent(project.description)}
            </>
          ) : !project.overview ? (
            <p className="text-muted-foreground">No detailed content available for this project.</p>
          ) : null}
        </div>
      </article>
      <Footer />
    </div>
  )
}
