"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, Check } from "lucide-react"

interface FilterDropdownProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  icon?: React.ReactNode
}

export default function FilterDropdown({ 
  options, 
  value, 
  onChange, 
  placeholder = "Select...",
  className = "",
  icon
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const handleSelect = (option: string) => {
    onChange(option)
    setIsOpen(false)
  }

  const displayValue = value === "All" ? placeholder : value

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-background border border-border rounded-lg hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 ${
          isOpen ? 'border-primary shadow-sm' : ''
        }`}
      >
        <div className="flex items-center gap-3">
          {icon && (
            <div className="absolute left-3 text-muted-foreground">
              {icon}
            </div>
          )}
          <span className={`text-sm ${value === "All" ? 'text-muted-foreground' : 'text-foreground'}`}>
            {displayValue}
          </span>
        </div>
        <ChevronDown 
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border border-border rounded-lg shadow-lg overflow-hidden animate-in slide-in-from-top-2 duration-200">
          <div className="max-h-64 overflow-y-auto">
            {options.map((option, index) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted transition-colors duration-150 ${
                  index !== options.length - 1 ? 'border-b border-border/50' : ''
                } ${
                  value === option ? 'bg-primary/10 text-primary' : 'text-foreground'
                }`}
              >
                <span className="text-sm font-medium">{option}</span>
                {value === option && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
