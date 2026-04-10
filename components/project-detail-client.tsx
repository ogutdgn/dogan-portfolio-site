"use client"

import { ArrowLeft, Calendar, Share2, ExternalLink, Github } from "lucide-react"
import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/components/portable-text-components'
import { urlForImage } from "@/lib/sanity.image"
import Footer from "@/components/footer"

export default function ProjectDetailClient({ project }: { project: any }) {
  const handleBackClick = () => {
    window.location.href = "/projects"
  }

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({ title: project.title, url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const renderContent = (content: string) => {
    if (!content) return null
    return content
      .split("\n")
      .map((line, index) => {
        if (line.startsWith("# ")) return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{line.substring(2)}</h1>
        if (line.startsWith("## ")) return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{line.substring(3)}</h2>
        if (line.startsWith("### ")) return <h3 key={index} className="text-xl font-bold mt-4 mb-2">{line.substring(4)}</h3>
        if (line.trim()) return <p key={index} className="mb-4 leading-relaxed">{line}</p>
        return <br key={index} />
      })
      .filter(Boolean)
  }

  return (
    <div className="min-h-screen bg-background">
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

      <article className="max-w-4xl mx-auto px-6 sm:px-8 py-12">
        <header className="mb-12">
          <div className="mb-6">
            <span className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full">
              {project.projectType || project.category || "Uncategorized"}
            </span>
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
