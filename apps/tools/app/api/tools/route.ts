import { NextResponse } from "next/server";
import { getAllTools } from "@/lib/queries";

export async function GET() {
  const tools = await getAllTools();
  return NextResponse.json(tools);
}
