import { NextResponse } from "next/server";
import { getAllCategories } from "@ogutdgn/sanity-shared";

export async function GET() {
  const categories = await getAllCategories();
  return NextResponse.json(categories);
}
