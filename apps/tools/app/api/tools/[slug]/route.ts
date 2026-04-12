import { NextResponse } from "next/server";
import { getToolBySlug } from "@/lib/queries";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);
  if (!tool) return NextResponse.json(null, { status: 404 });
  return NextResponse.json(tool);
}
