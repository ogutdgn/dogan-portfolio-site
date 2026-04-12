"use client"

import { useState, useEffect } from "react"
import { Menu, X, Github, Linkedin, Mail } from "lucide-react"

interface NavLink {
  name: string
  href: string
  external?: boolean
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const openMenu = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setIsOpen(true)
    }, 10)
  }

  const closeMenu = () => {
    setIsOpen(false)
    setTimeout(() => {
      setIsAnimating(false)
    }, 300)
  }

  const scrollToSection = (sectionId: string) => {
    closeMenu()

    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80

        const startPosition = window.pageYOffset
        const distance = offsetTop - startPosition
        const duration = 1200
        let start: number | null = null

        const animation = (currentTime: number) => {
          if (start === null) start = currentTime
          const timeElapsed = currentTime - start
          const run = ease(timeElapsed, startPosition, distance, duration)
          window.scrollTo(0, run)
          if (timeElapsed < duration) requestAnimationFrame(animation)
        }

        const ease = (t: number, b: number, c: number, d: number): number => {
          t /= d / 2
          if (t < 1) return (c / 2) * t * t + b
          t--
          return (-c / 2) * (t * (t - 2) - 1) + b
        }

        requestAnimationFrame(animation)
      }
    }, 300)
  }

  const navLinks: NavLink[] = [
    { name: "Home", href: "home" },
    { name: "About", href: "about" },
    { name: "Education", href: "education" },
    { name: "Tech Stack", href: "tech-stack" },
    { name: "Projects", href: "projects" },
    { name: "Blogs", href: "blogs" },
    { name: "Contact", href: "contact" },
    { name: "Resume", href: "/dogan-ogut-resume.pdf", external: true },
  ]

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/ogutdgn", icon: Github },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/doganogut/", icon: Linkedin },
    { name: "Email", href: "mailto:contactdgn@ogutdgn.com", icon: Mail },
  ]

  // Don't render mobile sidebar until mounted to prevent hydration mismatch
  if (!isMounted) {
    return (
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <button className="text-2xl font-bold text-foreground whitespace-nowrap">Dogan Ogut</button>

            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                >
                  {link.name}
                </button>
              ))}
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors whitespace-nowrap">
                Resume
              </button>
            </nav>

            <button className="lg:hidden p-2 hover:bg-muted rounded-md transition-colors">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection("home")}
            className="text-2xl font-bold text-foreground whitespace-nowrap"
          >
            Dogan Ogut
          </button>

          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              if (link.external) {
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors whitespace-nowrap"
                  >
                    {link.name}
                  </a>
                )
              }
              return (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                >
                  {link.name}
                </button>
              )
            })}
          </nav>

          <button
            className="lg:hidden p-2 hover:bg-muted rounded-md transition-colors"
            onClick={isOpen ? closeMenu : openMenu}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Mobile Sidebar - Only render when needed */}
          {(isOpen || isAnimating) && (
            <div className="fixed inset-0 z-40 lg:hidden">
              <div
                className={`fixed inset-0 backdrop-blur-sm bg-black/20 transition-opacity duration-300 ${
                  isOpen ? "opacity-100" : "opacity-0"
                }`}
                onClick={closeMenu}
              />

              <div
                className={`fixed right-0 top-0 h-screen w-80 bg-background shadow-2xl flex flex-col border-l transition-transform duration-300 ease-out ${
                  isOpen ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <div className="flex items-center justify-between p-6 border-b bg-background">
                  <span className="text-lg font-semibold">Menu</span>
                  <button className="p-2 hover:bg-muted rounded-md transition-colors" onClick={closeMenu}>
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav className="flex-1 p-6 bg-background">
                  <div className="space-y-2">
                    {navLinks.map((link, index) => {
                      if (link.external) {
                        return (
                          <a
                            key={link.name}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={closeMenu}
                            className={`block w-full mt-6 bg-primary text-primary-foreground px-4 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300 text-lg font-medium transform text-center ${
                              isOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                            }`}
                            style={{
                              transitionDelay: isOpen ? `${index * 50 + 200}ms` : "0ms",
                            }}
                          >
                            {link.name}
                          </a>
                        )
                      }
                      return (
                        <button
                          key={link.name}
                          onClick={() => scrollToSection(link.href)}
                          className={`block w-full text-left py-4 px-4 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300 text-lg transform ${
                            isOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                          }`}
                          style={{
                            transitionDelay: isOpen ? `${index * 50 + 200}ms` : "0ms",
                          }}
                        >
                          {link.name}
                        </button>
                      )
                    })}
                  </div>
                </nav>

                <div className="p-6 border-t bg-background">
                  <h4
                    className={`text-sm font-semibold text-muted-foreground mb-4 transition-all duration-300 transform ${
                      isOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                    }`}
                    style={{
                      transitionDelay: isOpen ? `${(navLinks.length + 1) * 50 + 200}ms` : "0ms",
                    }}
                  >
                    Follow Me
                  </h4>
                  <div className="flex gap-4">
                    {socialLinks.map((social, index) => {
                      const IconComponent = social.icon
                      return (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-3 rounded-full border border-border hover:bg-muted transition-all duration-300 transform ${
                            isOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                          }`}
                          style={{
                            transitionDelay: isOpen ? `${(navLinks.length + 2 + index) * 50 + 200}ms` : "0ms",
                          }}
                        >
                          <IconComponent className="h-5 w-5" />
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
