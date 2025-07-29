"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"

export default function Hero() {
  const [text, setText] = useState("")
  const fullText = "Software Developer"

  useEffect(() => {
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.substring(0, i + 1))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80

      // Custom smooth scroll with slower animation
      const startPosition = window.pageYOffset
      const distance = offsetTop - startPosition
      const duration = 1200 // Increased duration for slower animation
      let start = null

      function animation(currentTime) {
        if (start === null) start = currentTime
        const timeElapsed = currentTime - start
        const run = ease(timeElapsed, startPosition, distance, duration)
        window.scrollTo(0, run)
        if (timeElapsed < duration) requestAnimationFrame(animation)
      }

      // Easing function for smooth animation
      function ease(t, b, c, d) {
        t /= d / 2
        if (t < 1) return (c / 2) * t * t + b
        t--
        return (-c / 2) * (t * (t - 2) - 1) + b
      }

      requestAnimationFrame(animation)
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-160px)]">
          <div className="opacity-0 animate-fade-in order-1 lg:order-1 flex flex-col justify-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Hi, I'm <span className="text-foreground">Dogan Ogut</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground mb-6">
              <span className="text-foreground">{text}</span>
              <span className="animate-blink">|</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              I build exceptional digital experiences with clean code and modern technologies. Turning complex problems
              into elegant solutions is what I do best.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="group bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center"
                onClick={() => scrollToSection("projects")}
              >
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                className="border border-border px-6 py-3 rounded-lg hover:bg-muted transition-colors"
                onClick={() => scrollToSection("contact")}
              >
                Contact Me
              </button>
            </div>

            <div className="flex gap-4 mt-8">
              <a
                href="https://github.com/ogutdgn"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full hover:bg-muted transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/doganogut/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full hover:bg-muted transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:ogutdgn@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full hover:bg-muted transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Profile Photo Section - Only show on desktop */}
          <div className="hidden lg:flex justify-center lg:justify-end opacity-0 animate-fade-in-delay order-2 lg:order-2">
            <div className="relative">
              {/* Decorative background circles */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-full blur-xl"></div>
              <div className="absolute -inset-2 bg-gradient-to-br from-primary/30 to-primary/5 rounded-full"></div>

              {/* Main profile photo container */}
              <div className="relative w-80 h-80 xl:w-96 xl:h-96">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-background shadow-2xl bg-muted">
                  <img
                    src="/dogito.jpg?height=400&width=400&text=Dogan+Ogut"
                    alt="Dogan Ogut - Software Developer"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary/20 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-primary/30 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute top-1/4 -left-8 w-6 h-6 bg-primary/25 rounded-full animate-pulse delay-500"></div>

                {/* Status indicator */}
                <div className="absolute bottom-8 right-8 flex items-center gap-2 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-full border border-border">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium">Available for work</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block">
        <button onClick={() => scrollToSection("about")} className="animate-bounce">
          <ArrowRight className="h-6 w-6 transform rotate-90" />
        </button>
      </div>
    </section>
  )
}
