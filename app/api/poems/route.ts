import { NextResponse } from "next/server"
import { desc } from "drizzle-orm"
import { db } from "@/lib/db"
import { poems } from "@/lib/db/schema"

export async function GET() { const rows = await db.select().from(poems).orderBy(desc(poems.createdAt)); return NextResponse.json(rows) }
export async function POST(request: Request) { const body = await request.json(); const title = typeof body.title === "string" ? body.title.trim() : ""; const text = typeof body.text === "string" ? body.text.trim() : ""; const topics = Array.isArray(body.topics) ? body.topics.filter((topic: unknown): topic is string => typeof topic === "string").slice(0, 3) : []; if (!title || !text) return NextResponse.json({ error: "Titre et poème requis." }, { status: 400 }); const [poem] = await db.insert(poems).values({ title, text, topics, author: typeof body.author === "string" && body.author.trim() ? body.author.trim() : "anonyme" }).returning(); return NextResponse.json(poem, { status: 201 }) }
