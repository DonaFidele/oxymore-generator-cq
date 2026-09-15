import { NextResponse } from "next/server"
import { eq, sql } from "drizzle-orm"
import { db } from "@/lib/db"
import { poemComments, poems } from "@/lib/db/schema"

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) { const { id } = await params; const body = await request.json().catch(() => ({})); const [poem] = await db.update(poems).set({ likesCount: sql`${poems.likesCount} + 1` }).where(eq(poems.id, id)).returning(); if (!poem) return NextResponse.json({ error: "Poème introuvable." }, { status: 404 }); return NextResponse.json(poem) }
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) { const { id } = await params; const comments = await db.select().from(poemComments).where(eq(poemComments.poemId, id)); return NextResponse.json(comments) }
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) { const { id } = await params; const body = await request.json(); const text = typeof body.text === "string" ? body.text.trim() : ""; if (!text) return NextResponse.json({ error: "Commentaire requis." }, { status: 400 }); const [comment] = await db.insert(poemComments).values({ poemId: id, text, author: typeof body.author === "string" && body.author.trim() ? body.author.trim() : "anonyme" }).returning(); return NextResponse.json(comment, { status: 201 }) }
