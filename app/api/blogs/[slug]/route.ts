import { NextResponse } from 'next/server';
import { getBlogBySlug } from '@/lib/sanity.queries';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const blog = await getBlogBySlug(params.slug);
    if (!blog) return NextResponse.json(null, { status: 404 });
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
