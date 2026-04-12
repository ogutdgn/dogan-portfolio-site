import { NextResponse } from 'next/server';
import { getBlogs } from '@ogutdgn/sanity-shared';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const blogs = await getBlogs();
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
