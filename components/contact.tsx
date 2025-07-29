"use client"

import { useState } from "react"
import { Mail, MapPin, Phone, Github, Linkedin } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simple toast notification
    const toastElement = document.createElement("div")
    toastElement.className = "fixed top-4 right-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg z-50"
    toastElement.innerHTML = "Message sent! Thank you for your message. I'll get back to you soon."
    document.body.appendChild(toastElement)

    setTimeout(() => {
      toastElement.classList.add("opacity-0", "transition-opacity", "duration-300")
      setTimeout(() => {
        document.body.removeChild(toastElement)
      }, 300)
    }, 3000)

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />, 
      title: "Email",
      value: "ogutdgn@gmail.com",
      link: "mailto:ogutdgn@gmail.com",
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />, 
      title: "Phone",
      value: "+1 (945)5465406",
      link: "tel:+19455465406",
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />, 
      title: "Location",
      value: "Dallas, TX",
      link: null,
    },
  ]

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center md:text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-left md:text-center">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary md:mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          {/* Contact Info - Mobile'da üstte, Desktop'ta sağda */}
          <div className="lg:order-2">
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">{info.icon}</div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">{info.title}</h4>
                      {info.link ? (
                        <a href={info.link} className="text-muted-foreground hover:text-primary transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.value}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-card border border-border rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/in/doganogut/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-border rounded-full hover:bg-muted transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="mailto:ogutdgn@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-border rounded-full hover:bg-muted transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                  <a
                    href="https://github.com/ogutdgn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-border rounded-full hover:bg-muted transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form - Mobile'da altta, Desktop'ta solda */}
          <div className="lg:col-span-2 lg:order-1">
            <div className="bg-card border border-border rounded-lg p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Your Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    placeholder="Project Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="I'd like to discuss a project..."
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
