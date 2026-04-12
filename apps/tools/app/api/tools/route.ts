import { NextResponse } from "next/server";
import { getAllTools } from "@ogutdgn/sanity-shared";

export async function GET() {
  const tools = await getAllTools();
  return NextResponse.json(tools);
}
