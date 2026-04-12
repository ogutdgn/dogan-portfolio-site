import { NextResponse } from "next/server";
import { getToolBySlug } from "@/lib/queries";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const tool = await getToolBySlug(params.slug);
  if (!tool) return NextResponse.json(null, { status: 404 });
  return NextResponse.json(tool);
}
