import { groq } from 'next-sanity';
import { client } from './sanity.client';

// Projects
export async function getProjects() {
    console.log("Fetching projects from Sanity");
  const query = groq`*[_type == "project"] {
    _id,
    title,
    "slug": slug.current,
    overview,
    image,
    technologies,
    projectType,
    mainCategory,
    tags,
    githubLink,
    liveLink,
    publishedAt,
    _createdAt
  } | order(_createdAt desc)`;
    console.log(client.fetch(query));
  return client.fetch(query);
}

export async function getProject(slug: string) {
  const query = groq`*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    overview,
    image,
    technologies,
    projectType,
    mainCategory,
    tags,
    githubLink,
    liveLink,
    description,
    content,
    publishedAt,
    _createdAt
  }`;

  return client.fetch(query, { slug });
}

// Blogs
export async function getBlogs() {
  const query = groq`*[_type == "blog"] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    description,
    readingTime,
    mainImage,
    mainCategory,
    tags,
    _createdAt
  } | order(publishedAt desc)`;

  return client.fetch(query);
}


export async function getBlogBySlug(slug: string) {
  const query = groq`*[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    readingTime,
    mainImage,
    mainCategory,
    tags,
    content,
    body,
    description,
    _createdAt
  }`;
  return client.fetch(query, { slug });
}

// Similar Projects
export async function getSimilarProjects(currentProjectId: string, mainCategory?: string, tags: string[] = []) {
  const query = groq`*[_type == "project" && _id != $currentProjectId] {
    _id,
    title,
    "slug": slug.current,
    overview,
    image,
    technologies,
    mainCategory,
    tags,
    githubLink,
    liveLink,
    publishedAt,
    _createdAt
  } | order(publishedAt desc)`;

  const projects = await client.fetch(query, { currentProjectId });

  // Calculate similarity score for each project
  const projectsWithScore = projects.map((project: any) => {
    let score = 0;
    
    // Main category match (highest priority)
    if (project.mainCategory === mainCategory) {
      score += 10;
    }
    
    // Tag similarity
    const commonTags = tags.filter(tag => project.tags?.includes(tag));
    score += commonTags.length * 3;
    
    // Technology similarity (if tags include technologies)
    const commonTech = tags.filter(tag => project.technologies?.includes(tag));
    score += commonTech.length * 2;
    
    return { ...project, similarityScore: score };
  });

  // Sort by similarity score and return top 3
  return projectsWithScore
    .sort((a: any, b: any) => b.similarityScore - a.similarityScore)
    .slice(0, 3);
}

// Similar Blogs
export async function getSimilarBlogs(currentBlogId: string, mainCategory?: string, tags: string[] = []) {
  const query = groq`*[_type == "blog" && _id != $currentBlogId] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    mainImage,
    mainCategory,
    tags,
    _createdAt
  } | order(publishedAt desc)`;

  const blogs = await client.fetch(query, { currentBlogId });

  // Calculate similarity score for each blog
  const blogsWithScore = blogs.map((blog: any) => {
    let score = 0;
    
    // Main category match (highest priority)
    if (blog.mainCategory === mainCategory) {
      score += 10;
    }
    
    // Tag similarity
    const commonTags = tags.filter(tag => blog.tags?.includes(tag));
    score += commonTags.length * 3;
    
    return { ...blog, similarityScore: score };
  });

  // Sort by similarity score and return top 3
  return blogsWithScore
    .sort((a: any, b: any) => b.similarityScore - a.similarityScore)
    .slice(0, 3);
}
