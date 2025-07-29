"use client"

import { ArrowLeft, Calendar, Share2, ExternalLink, Github } from "lucide-react"
import { useParams } from "next/navigation"

export default function ProjectDetail() {
  const params = useParams()
  const slug = params?.slug as string

  // Mock project data - in real app, this would come from a CMS or API
  const projectData = {
    "ecommerce-platform": {
      title: "E-Commerce Platform",
      date: "2024-01-20",
      category: "Web Development",
      image: "/placeholder.svg?height=400&width=800&text=E-Commerce+Platform",
      tags: ["C++", "Qt", "SQLite", "CMake"],
      demoLink: "#",
      githubLink: "#",
      description:
        "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
      features: [
        "Inventory management system",
        "Real-time stock tracking",
        "Secure payment processing",
        "Order management dashboard",
        "Customer analytics",
      ],
      content: `
# E-Commerce Platform

This e-commerce platform provides businesses with a complete solution for selling products online. Built with C++ and Qt for high performance and cross-platform compatibility.

## Key Features

The platform includes a responsive design, product catalog with filtering and search capabilities, shopping cart functionality, secure checkout integration, user authentication, and an admin dashboard for managing products, orders, and customers.

## Technical Implementation

\`\`\`cpp
#include <QtWidgets>
#include <QApplication>
#include <QMainWindow>

class ECommerceApp : public QMainWindow {
    Q_OBJECT

public:
    ECommerceApp(QWidget *parent = nullptr);
    ~ECommerceApp();

private slots:
    void addToCart();
    void processPayment();
    void updateInventory();

private:
    void setupUI();
    void connectDatabase();
    
    QWidget *centralWidget;
    QVBoxLayout *mainLayout;
    QPushButton *addToCartBtn;
    QPushButton *checkoutBtn;
};
\`\`\`

## Database Design

The application uses SQLite for data persistence with optimized queries for product search and inventory management.

## Performance Optimizations

- Efficient memory management
- Optimized database queries
- Asynchronous payment processing
- Caching for frequently accessed data

## Deployment

The application can be deployed on Windows, macOS, and Linux systems with minimal configuration changes.
      `,
    },
    "task-management-system": {
      title: "Task Management System",
      date: "2024-01-15",
      category: "Web Application",
      image: "/placeholder.svg?height=400&width=800&text=Task+Management",
      tags: ["Java", "Spring Boot", "React", "PostgreSQL"],
      demoLink: "#",
      githubLink: "#",
      description: "A collaborative task management application with real-time updates and team workspaces.",
      features: [
        "Real-time collaboration",
        "Task dependencies",
        "Resource allocation",
        "Progress tracking",
        "Team management",
      ],
      content: `
# Task Management System

This task management system helps teams organize and track their work efficiently. Built with Java Spring Boot for the backend and React for the frontend.

## Architecture Overview

The system follows a microservices architecture with separate services for user management, task processing, and notifications.

## Backend Implementation

\`\`\`java
@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    
    @Autowired
    private TaskService taskService;
    
    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody TaskDto taskDto) {
        Task task = taskService.createTask(taskDto);
        return ResponseEntity.ok(task);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTask(@PathVariable Long id) {
        Task task = taskService.findById(id);
        return ResponseEntity.ok(task);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody TaskDto taskDto) {
        Task updatedTask = taskService.updateTask(id, taskDto);
        return ResponseEntity.ok(updatedTask);
    }
}
\`\`\`

## Real-time Features

WebSocket integration enables real-time updates across all connected clients when tasks are created, updated, or completed.

## Database Schema

PostgreSQL database with optimized indexes for fast task queries and user permissions.
      `,
    },
    // Add more projects here...
  }

  const similarProjects = [
    {
      id: 3,
      title: "System Resource Monitor",
      date: "2024-01-10",
      category: "Systems Programming",
      image: "/placeholder.svg?height=300&width=500&text=System+Monitor",
      slug: "system-resource-monitor",
    },
    {
      id: 4,
      title: "Compiler Design Project",
      date: "2024-01-05",
      category: "Systems Programming",
      image: "/placeholder.svg?height=300&width=500&text=Compiler+Design",
      slug: "compiler-design-project",
    },
    {
      id: 5,
      title: "Distributed Database System",
      date: "2023-12-30",
      category: "Database",
      image: "/placeholder.svg?height=300&width=500&text=Distributed+DB",
      slug: "distributed-database-system",
    },
  ]
    .filter((project) => project.slug !== slug)
    .slice(0, 3)

  const handleProjectClick = (projectSlug: string) => {
    if (typeof window !== "undefined") {
      window.location.href = `/project/${projectSlug}`
    }
  }

  const project = projectData[slug] || {
    title: "Project Not Found",
    date: "2024-01-01",
    category: "General",
    image: "/placeholder.svg?height=400&width=800&text=Not+Found",
    tags: [],
    demoLink: "#",
    githubLink: "#",
    description: "The requested project could not be found.",
    features: [],
    content: "# Project Not Found\n\nThe requested project could not be found.",
  }

  const handleBackClick = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/projects"
    }
  }

  const handleShareClick = () => {
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
    return content
      .split("\n")
      .map((line, index) => {
        // Headers
        if (line.startsWith("# ")) {
          return (
            <h1 key={index} className="text-3xl font-bold mt-8 mb-4">
              {line.substring(2)}
            </h1>
          )
        }
        if (line.startsWith("## ")) {
          return (
            <h2 key={index} className="text-2xl font-bold mt-6 mb-3">
              {line.substring(3)}
            </h2>
          )
        }

        // Code blocks
        if (line.startsWith("```")) {
          const language = line.substring(3)
          const codeLines = []
          let i = index + 1

          while (i < content.split("\n").length && !content.split("\n")[i].startsWith("```")) {
            codeLines.push(content.split("\n")[i])
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

        // Skip lines that are part of code blocks
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

        // Regular paragraphs
        if (line.trim()) {
          return (
            <p key={index} className="mb-4 leading-relaxed">
              {line}
            </p>
          )
        }

        return <br key={index} />
      })
      .filter(Boolean)
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
            <span className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full">
              {project.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{project.title}</h1>

          <div className="flex items-center gap-6 text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{new Date(project.date).toLocaleDateString()}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span key={i} className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="w-full aspect-video object-cover rounded-lg mb-8"
          />

          <p className="text-lg text-muted-foreground mb-8">{project.description}</p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border border-border px-4 py-3 rounded-lg hover:bg-muted transition-colors flex items-center justify-center"
            >
              <Github className="h-4 w-4 mr-2" />
              View Source Code
            </a>
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-primary text-primary-foreground px-4 py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Live Demo
            </a>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {project.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Project Content */}
        <div className="prose prose-lg max-w-none">{renderContent(project.content)}</div>

        {/* Similar Projects Section */}
        <div className="mt-16 pt-8 border-t">
          <h3 className="text-2xl font-bold mb-6">Similar Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProjects.map((similarProject) => (
              <div
                key={similarProject.id}
                className="group bg-card border border-border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
                onClick={() => handleProjectClick(similarProject.slug)}
              >
                <img
                  src={similarProject.image || "/placeholder.svg"}
                  alt={similarProject.title}
                  className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-4">
                  <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                    {similarProject.category}
                  </span>
                  <h4 className="text-lg font-semibold mt-2 mb-2 group-hover:text-primary transition-colors">
                    {similarProject.title}
                  </h4>
                  <div className="text-sm text-muted-foreground">
                    {new Date(similarProject.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}
