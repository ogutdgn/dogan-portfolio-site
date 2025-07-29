"use client"

import { useState } from "react"
import { Star, StarHalf, ChevronLeft, ChevronRight } from "lucide-react"

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Product Manager at TechCorp",
      content:
        "Working with Dogan was an absolute pleasure. They delivered our project on time and exceeded our expectations in terms of quality and functionality. Their attention to detail and problem-solving skills are exceptional.",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "CTO at StartupX",
      content:
        "Dogan helped us rebuild our entire platform from the ground up. Their technical expertise and ability to understand our business needs resulted in a product that has significantly improved our user engagement and conversion rates.",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Founder of DesignHub",
      content:
        "I was impressed by Dogan's ability to translate our design vision into a fully functional website. They were responsive, professional, and provided valuable suggestions that improved the overall user experience.",
      rating: 4.5,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      name: "David Kim",
      position: "Marketing Director at GrowthCo",
      content:
        "Dogan developed a custom analytics dashboard for our marketing team that has transformed how we track and optimize our campaigns. Their solution was elegant, intuitive, and exactly what we needed.",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 5,
      name: "Lisa Patel",
      position: "E-commerce Manager at RetailPlus",
      content:
        "The e-commerce platform developed by Dogan has been a game-changer for our business. It's fast, secure, and our customers love the seamless shopping experience. We've seen a 40% increase in online sales since launch.",
      rating: 4.5,
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-5 w-5 fill-primary text-primary" />)
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-5 w-5 fill-primary text-primary" />)
    }

    return <div className="flex">{stars}</div>
  }

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ]

  return (
    <section id="testimonials" className="py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm border border-border rounded-full mb-4">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Satisfaction</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial, index) => (
              <div key={`${testimonial.id}-${currentIndex}`} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                <div>{renderStars(testimonial.rating)}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={prevTestimonial}
              className="p-2 border border-border rounded-full hover:bg-muted transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2 border border-border rounded-full hover:bg-muted transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
