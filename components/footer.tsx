import { Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/ogutdgn", icon: Github },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/doganogut/", icon: Linkedin },
    { name: "Email", href: "mailto:ogutdgn@gmail.com", icon: Mail },
    { name: "Email", href: "mailto:ogutdgn@gmail.com", icon: Mail },
  ]

  return (
    <footer className="bg-muted py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Mobile Layout - Vertical */}
        <div className="flex flex-col items-center space-y-6 md:hidden">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground mb-2">Dogan Ogut</p>
            <p className="text-muted-foreground">Software Developer</p>
          </div>

          <div className="flex gap-4">
            {socialLinks.map((social) => {
              const IconComponent = social.icon
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-border hover:bg-background hover:scale-110 transition-all duration-300"
                  aria-label={social.name}
                >
                  <IconComponent className="h-5 w-5" />
                </a>
              )
            })}
          </div>

          <div className="text-center pt-6 border-t border-border w-full">
            <p className="text-muted-foreground">© {currentYear} Dogan Ogut. All rights reserved.</p>
          </div>
        </div>

        {/* Desktop Layout - Horizontal */}
        <div className="hidden md:flex items-center justify-between">
          {/* Left - Name and Title */}
          <div className="text-left">
            <p className="text-2xl font-bold text-foreground mb-1">Dogan Ogut</p>
            <p className="text-muted-foreground">Software Developer</p>
          </div>

          {/* Center - Copyright */}
          <div className="text-center">
            <p className="text-muted-foreground">© {currentYear} Dogan Ogut. All rights reserved.</p>
          </div>

          {/* Right - Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => {
              const IconComponent = social.icon
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-border hover:bg-background hover:scale-110 transition-all duration-300"
                  aria-label={social.name}
                >
                  <IconComponent className="h-5 w-5" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
