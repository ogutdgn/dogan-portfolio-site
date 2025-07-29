"use client"

import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react"
import { useParams } from "next/navigation"

export default function BlogPost() {
  const params = useParams()
  const slug = params?.slug as string

  // Mock blog data - in real app, this would come from a CMS or API
  const blogData = {
    "building-realtime-chat-websockets": {
      title: "Building a Real-time Chat Application with WebSockets",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Web Development",
      image: "/placeholder.svg?height=400&width=800&text=Chat+App",
      content: `
# Building a Real-time Chat Application with WebSockets

Real-time communication has become an essential feature in modern web applications. In this comprehensive guide, I'll walk you through building a scalable chat application using Node.js, Socket.io, and React.

## Project Overview

Our chat application will include:
- Real-time messaging
- Multiple chat rooms
- User authentication
- Message history
- Online user status

## Setting Up the Backend

First, let's set up our Node.js server with Express and Socket.io:

\`\`\`javascript
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-joined', socket.id);
  });
  
  socket.on('send-message', (data) => {
    socket.to(data.roomId).emit('receive-message', {
      message: data.message,
      senderId: socket.id,
      timestamp: new Date()
    });
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

## Frontend Implementation

Now let's create our React frontend with Socket.io client:

\`\`\`jsx
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const ChatApp = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [roomId, setRoomId] = useState('general');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.emit('join-room', roomId);

    newSocket.on('receive-message', (data) => {
      setMessages(prev => [...prev, data]);
    });

    return () => newSocket.close();
  }, [roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (currentMessage.trim() && socket) {
      const messageData = {
        roomId,
        message: currentMessage,
        timestamp: new Date()
      };
      
      socket.emit('send-message', messageData);
      setMessages(prev => [...prev, { ...messageData, senderId: 'me' }]);
      setCurrentMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={\`message \${msg.senderId === 'me' ? 'sent' : 'received'}\`}
          >
            <p>{msg.message}</p>
            <span className="timestamp">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={sendMessage} className="message-form">
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};
\`\`\`

## Database Integration

For persistent message storage, let's integrate MongoDB:

\`\`\`javascript
const mongoose = require('mongoose');

// Message Schema
const messageSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  senderId: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// Save message to database
socket.on('send-message', async (data) => {
  try {
    const newMessage = new Message({
      roomId: data.roomId,
      senderId: socket.id,
      message: data.message
    });
    
    await newMessage.save();
    
    socket.to(data.roomId).emit('receive-message', {
      message: data.message,
      senderId: socket.id,
      timestamp: newMessage.timestamp
    });
  } catch (error) {
    console.error('Error saving message:', error);
  }
});
\`\`\`

## Performance Optimizations

To handle high traffic, implement these optimizations:

1. **Connection Pooling**: Limit concurrent connections
2. **Message Throttling**: Prevent spam
3. **Room Management**: Efficiently manage chat rooms
4. **Caching**: Use Redis for session management

\`\`\`javascript
// Rate limiting example
const rateLimit = new Map();

socket.on('send-message', (data) => {
  const userId = socket.id;
  const now = Date.now();
  const userLimit = rateLimit.get(userId) || { count: 0, resetTime: now + 60000 };
  
  if (now > userLimit.resetTime) {
    userLimit.count = 0;
    userLimit.resetTime = now + 60000;
  }
  
  if (userLimit.count >= 10) {
    socket.emit('rate-limit-exceeded');
    return;
  }
  
  userLimit.count++;
  rateLimit.set(userId, userLimit);
  
  // Process message...
});
\`\`\`

## Deployment Considerations

When deploying your chat application:

- Use a process manager like PM2
- Implement horizontal scaling with Redis adapter
- Set up proper CORS policies
- Use HTTPS in production
- Monitor performance and error rates

## Conclusion

Building a real-time chat application requires careful consideration of both frontend and backend architecture. The combination of Socket.io, React, and proper database design creates a robust foundation for real-time communication.

The complete source code for this project is available on my [GitHub profile](https://github.com/ogutdgn).
      `,
    },
    "cpp-memory-management-optimization": {
      title: "Optimizing C++ Performance: Memory Management Techniques",
      date: "2024-01-08",
      readTime: "12 min read",
      category: "Systems Programming",
      image: "/placeholder.svg?height=400&width=800&text=C%2B%2B+Performance",
      content: `
# Optimizing C++ Performance: Memory Management Techniques

Memory management is crucial for high-performance C++ applications. In this deep dive, we'll explore advanced techniques that can significantly improve your application's performance.

## Understanding Memory Layout

Before optimizing, it's essential to understand how memory is organized:

\`\`\`cpp
#include <iostream>
#include <chrono>
#include <vector>

class MemoryAnalyzer {
private:
    static constexpr size_t CACHE_LINE_SIZE = 64;
    
public:
    // Cache-friendly data structure
    struct alignas(CACHE_LINE_SIZE) CacheAlignedData {
        int value;
        char padding[CACHE_LINE_SIZE - sizeof(int)];
    };
    
    // Test cache performance
    void testCachePerformance() {
        const size_t SIZE = 1000000;
        std::vector<int> data(SIZE);
        
        auto start = std::chrono::high_resolution_clock::now();
        
        // Sequential access (cache-friendly)
        for (size_t i = 0; i < SIZE; ++i) {
            data[i] = i * 2;
        }
        
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::microseconds>(end - start);
        
        std::cout << "Sequential access time: " << duration.count() << " microseconds\\n";
    }
};
\`\`\`

## Custom Memory Allocators

Implementing custom allocators can dramatically improve performance:

\`\`\`cpp
template<typename T>
class PoolAllocator {
private:
    struct Block {
        alignas(T) char data[sizeof(T)];
        Block* next;
    };
    
    Block* freeList;
    std::vector<std::unique_ptr<Block[]>> pools;
    size_t poolSize;
    
public:
    explicit PoolAllocator(size_t poolSize = 1024) 
        : freeList(nullptr), poolSize(poolSize) {
        allocateNewPool();
    }
    
    T* allocate() {
        if (!freeList) {
            allocateNewPool();
        }
        
        Block* block = freeList;
        freeList = freeList->next;
        return reinterpret_cast<T*>(block);
    }
    
    void deallocate(T* ptr) {
        Block* block = reinterpret_cast<Block*>(ptr);
        block->next = freeList;
        freeList = block;
    }
    
private:
    void allocateNewPool() {
        auto pool = std::make_unique<Block[]>(poolSize);
        
        // Link all blocks in the pool
        for (size_t i = 0; i < poolSize - 1; ++i) {
            pool[i].next = &pool[i + 1];
        }
        pool[poolSize - 1].next = freeList;
        freeList = &pool[0];
        
        pools.push_back(std::move(pool));
    }
};
\`\`\`

## RAII and Smart Pointers

Proper resource management prevents memory leaks:

\`\`\`cpp
#include <memory>
#include <fstream>

class ResourceManager {
public:
    // Custom deleter for file handles
    struct FileDeleter {
        void operator()(std::FILE* file) const {
            if (file) {
                std::fclose(file);
            }
        }
    };
    
    using FilePtr = std::unique_ptr<std::FILE, FileDeleter>;
    
    static FilePtr openFile(const std::string& filename, const std::string& mode) {
        std::FILE* file = std::fopen(filename.c_str(), mode.c_str());
        return FilePtr(file);
    }
    
    // RAII wrapper for system resources
    class SystemResource {
    private:
        void* handle;
        
    public:
        explicit SystemResource(void* h) : handle(h) {}
        
        ~SystemResource() {
            if (handle) {
                // Release system resource
                releaseHandle(handle);
            }
        }
        
        // Move semantics
        SystemResource(SystemResource&& other) noexcept 
            : handle(other.handle) {
            other.handle = nullptr;
        }
        
        SystemResource& operator=(SystemResource&& other) noexcept {
            if (this != &other) {
                if (handle) {
                    releaseHandle(handle);
                }
                handle = other.handle;
                other.handle = nullptr;
            }
            return *this;
        }
        
        // Delete copy operations
        SystemResource(const SystemResource&) = delete;
        SystemResource& operator=(const SystemResource&) = delete;
        
    private:
        void releaseHandle(void* h) {
            // Platform-specific resource cleanup
        }
    };
};
\`\`\`

## Memory Pool Implementation

For high-frequency allocations, memory pools are essential:

\`\`\`cpp
class MemoryPool {
private:
    struct FreeBlock {
        FreeBlock* next;
    };
    
    char* memory;
    FreeBlock* freeBlocks;
    size_t blockSize;
    size_t blockCount;
    
public:
    MemoryPool(size_t blockSize, size_t blockCount)
        : blockSize(std::max(blockSize, sizeof(FreeBlock)))
        , blockCount(blockCount) {
        
        // Allocate aligned memory
        memory = static_cast<char*>(std::aligned_alloc(
            std::max(alignof(std::max_align_t), alignof(FreeBlock)),
            this->blockSize * blockCount
        ));
        
        if (!memory) {
            throw std::bad_alloc();
        }
        
        // Initialize free list
        freeBlocks = reinterpret_cast<FreeBlock*>(memory);
        FreeBlock* current = freeBlocks;
        
        for (size_t i = 0; i < blockCount - 1; ++i) {
            current->next = reinterpret_cast<FreeBlock*>(
                reinterpret_cast<char*>(current) + this->blockSize
            );
            current = current->next;
        }
        current->next = nullptr;
    }
    
    ~MemoryPool() {
        std::free(memory);
    }
    
    void* allocate() {
        if (!freeBlocks) {
            return nullptr; // Pool exhausted
        }
        
        void* result = freeBlocks;
        freeBlocks = freeBlocks->next;
        return result;
    }
    
    void deallocate(void* ptr) {
        if (!ptr) return;
        
        FreeBlock* block = static_cast<FreeBlock*>(ptr);
        block->next = freeBlocks;
        freeBlocks = block;
    }
    
    // Non-copyable, non-movable
    MemoryPool(const MemoryPool&) = delete;
    MemoryPool& operator=(const MemoryPool&) = delete;
    MemoryPool(MemoryPool&&) = delete;
    MemoryPool& operator=(MemoryPool&&) = delete;
};
\`\`\`

## Performance Benchmarking

Always measure your optimizations:

\`\`\`cpp
#include <chrono>
#include <iostream>

class PerformanceBenchmark {
public:
    template<typename Func>
    static double measureTime(Func&& func, int iterations = 1000) {
        auto start = std::chrono::high_resolution_clock::now();
        
        for (int i = 0; i < iterations; ++i) {
            func();
        }
        
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);
        
        return static_cast<double>(duration.count()) / iterations;
    }
    
    static void compareAllocators() {
        const int ITERATIONS = 10000;
        const int ALLOCATIONS = 1000;
        
        // Standard allocator
        auto standardAlloc = []() {
            std::vector<int*> ptrs;
            for (int i = 0; i < ALLOCATIONS; ++i) {
                ptrs.push_back(new int(i));
            }
            for (auto ptr : ptrs) {
                delete ptr;
            }
        };
        
        // Pool allocator
        PoolAllocator<int> pool;
        auto poolAlloc = [&pool]() {
            std::vector<int*> ptrs;
            for (int i = 0; i < ALLOCATIONS; ++i) {
                int* ptr = pool.allocate();
                *ptr = i;
                ptrs.push_back(ptr);
            }
            for (auto ptr : ptrs) {
                pool.deallocate(ptr);
            }
        };
        
        double standardTime = measureTime(standardAlloc, ITERATIONS);
        double poolTime = measureTime(poolAlloc, ITERATIONS);
        
        std::cout << "Standard allocator: " << standardTime << " ns/iteration\\n";
        std::cout << "Pool allocator: " << poolTime << " ns/iteration\\n";
        std::cout << "Speedup: " << (standardTime / poolTime) << "x\\n";
    }
};
\`\`\`

## Best Practices

1. **Minimize Dynamic Allocation**: Use stack allocation when possible
2. **Pool Similar-Sized Objects**: Reduce fragmentation
3. **Align Data Structures**: Improve cache performance
4. **Use Move Semantics**: Avoid unnecessary copies
5. **Profile Before Optimizing**: Measure actual bottlenecks

## Conclusion

Effective memory management in C++ requires understanding both the hardware and the language features. By implementing custom allocators, using RAII principles, and measuring performance, you can achieve significant improvements in your application's speed and reliability.

The techniques shown here have helped me achieve 3-5x performance improvements in production systems handling millions of requests per second.
      `,
    },
    // Add more blog posts here...
  }

  const similarBlogs = [
    {
      id: 2,
      title: "Optimizing C++ Performance: Memory Management Techniques",
      date: "2024-01-08",
      readTime: "12 min read",
      category: "Systems Programming",
      image: "/placeholder.svg?height=300&width=500&text=C%2B%2B+Performance",
      slug: "cpp-memory-management-optimization",
    },
    {
      id: 3,
      title: "Creating a Custom Neural Network Framework from Scratch",
      date: "2024-01-01",
      readTime: "15 min read",
      category: "Machine Learning",
      image: "/placeholder.svg?height=300&width=500&text=Neural+Network",
      slug: "custom-neural-network-framework",
    },
    {
      id: 4,
      title: "Database Sharding Strategies for High-Traffic Applications",
      date: "2023-12-25",
      readTime: "10 min read",
      category: "Database",
      image: "/placeholder.svg?height=300&width=500&text=Database+Sharding",
      slug: "database-sharding-strategies",
    },
  ]
    .filter((blog) => blog.slug !== slug)
    .slice(0, 3)

  const handleBlogClick = (blogSlug: string) => {
    if (typeof window !== "undefined") {
      window.location.href = `/blog/${blogSlug}`
    }
  }

  const blog = blogData[slug] || {
    title: "Blog Post Not Found",
    date: "2024-01-01",
    readTime: "1 min read",
    category: "General",
    image: "/placeholder.svg?height=400&width=800&text=Not+Found",
    content: "# Blog Post Not Found\n\nThe requested blog post could not be found.",
  }

  const handleBackClick = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/blogs"
    }
  }

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
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
        if (line.startsWith("### ")) {
          return (
            <h3 key={index} className="text-xl font-bold mt-4 mb-2">
              {line.substring(4)}
            </h3>
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

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 sm:px-8 py-12">
        {/* Article Header */}
        <header className="mb-12">
          <div className="mb-6">
            <span className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full">{blog.category}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{blog.title}</h1>

          <div className="flex items-center gap-6 text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{new Date(blog.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{blog.readTime}</span>
            </div>
          </div>

          <img
            src={blog.image || "/placeholder.svg"}
            alt={blog.title}
            className="w-full aspect-video object-cover rounded-lg"
          />
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">{renderContent(blog.content)}</div>

        {/* Similar Blogs Section */}
        <div className="mt-16 pt-8 border-t">
          <h3 className="text-2xl font-bold mb-6">Similar Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarBlogs.map((similarBlog) => (
              <div
                key={similarBlog.id}
                className="group bg-card border border-border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
                onClick={() => handleBlogClick(similarBlog.slug)}
              >
                <img
                  src={similarBlog.image || "/placeholder.svg"}
                  alt={similarBlog.title}
                  className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-4">
                  <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                    {similarBlog.category}
                  </span>
                  <h4 className="text-lg font-semibold mt-2 mb-2 group-hover:text-primary transition-colors">
                    {similarBlog.title}
                  </h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{new Date(similarBlog.date).toLocaleDateString()}</span>
                    <span>{similarBlog.readTime}</span>
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
