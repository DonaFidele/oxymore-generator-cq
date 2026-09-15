import { NextResponse } from "next/server"
import { asc, eq, sql } from "drizzle-orm"
import { db } from "@/lib/db"
import { commentLikes as commentLikeRecords, poemComments, poemLikes, poems } from "@/lib/db/schema"

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json().catch(() => ({}))
  const visitorId = typeof body.visitorId === "string" ? body.visitorId.trim() : ""
  if (!visitorId) return NextResponse.json({ error: "Identifiant visiteur requis." }, { status: 400 })
  if (typeof body.commentId === "string") {
    const inserted = await db.insert(commentLikeRecords).values({ commentId: body.commentId, visitorId }).onConflictDoNothing().returning()
    if (inserted.length) await db.update(poemComments).set({ likesCount: sql`${poemComments.likesCount} + 1` }).where(eq(poemComments.id, body.commentId))
    const [comment] = await db.select().from(poemComments).where(eq(poemComments.id, body.commentId))
    return NextResponse.json({ ...comment, liked: inserted.length > 0 })
  }
  const inserted = await db.insert(poemLikes).values({ poemId: id, visitorId }).onConflictDoNothing().returning()
  if (inserted.length) await db.update(poems).set({ likesCount: sql`${poems.likesCount} + 1` }).where(eq(poems.id, id))
  const [poem] = await db.select().from(poems).where(eq(poems.id, id))
  if (!poem) return NextResponse.json({ error: "Poème introuvable." }, { status: 404 })
  return NextResponse.json({ ...poem, liked: inserted.length > 0 })
}
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) { const { id } = await params; const comments = await db.select().from(poemComments).where(eq(poemComments.poemId, id)).orderBy(asc(poemComments.createdAt)); return NextResponse.json(comments) }
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) { const { id } = await params; const body = await request.json(); const text = typeof body.text === "string" ? body.text.trim() : ""; if (!text) return NextResponse.json({ error: "Commentaire requis." }, { status: 400 }); const [comment] = await db.insert(poemComments).values({ poemId: id, parentId: typeof body.parentId === "string" ? body.parentId : null, text, author: typeof body.author === "string" && body.author.trim() ? body.author.trim() : "anonyme" }).returning(); return NextResponse.json(comment, { status: 201 }) }
