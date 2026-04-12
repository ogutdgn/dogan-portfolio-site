import { PortableTextComponents } from '@portabletext/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { urlForImage } from '@/lib/sanity.image'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

// Code Block Component
const CodeBlock = ({ value }: any) => {
  const [copied, setCopied] = useState(false)
  const { code, language, filename } = value

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-border bg-muted/30">
      {/* Header with filename and copy button */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
        <div className="flex items-center gap-2">
          {filename && (
            <span className="text-sm font-mono text-muted-foreground">
              {filename}
            </span>
          )}
          {language && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
              {language}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 text-xs hover:bg-background rounded transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              Copy
            </>
          )}
        </button>
      </div>
      
      {/* Code content */}
      <div className="relative">
        <SyntaxHighlighter
          language={language || 'text'}
          style={tomorrow}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'transparent',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
          showLineNumbers={true}
          lineNumberStyle={{
            minWidth: '2.5rem',
            paddingRight: '1rem',
            color: '#6b7280',
            userSelect: 'none',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

// Custom PortableText components
export const portableTextComponents: PortableTextComponents = {
  types: {
    code: CodeBlock,
    image: ({ value }) => {
      if (!value?.asset) return null
      
      return (
        <div className="my-8">
          <img
            src={urlForImage(value).url()}
            alt={value.alt || ''}
            className="w-full rounded-lg"
            loading="lazy"
          />
          {value.alt && (
            <p className="text-center text-sm text-muted-foreground mt-2 italic">
              {value.alt}
            </p>
          )}
        </div>
      )
    },
  },
  marks: {
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 bg-muted text-foreground rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline font-medium"
      >
        {children}
      </a>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-12 mb-6 text-foreground">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-10 mb-5 text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mt-8 mb-4 text-foreground">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-bold mt-6 mb-3 text-foreground">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-6 py-2 my-6 italic bg-muted/30 rounded-r-lg">
        <div className="text-muted-foreground">{children}</div>
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-7 text-foreground">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-foreground">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-foreground">{children}</li>
    ),
  },
}
