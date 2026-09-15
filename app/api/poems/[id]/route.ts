import { NextResponse } from "next/server"
import { and, asc, eq, sql } from "drizzle-orm"
import { db } from "@/lib/db"
import { commentLikes as commentLikeRecords, poemComments, poemLikes, poems } from "@/lib/db/schema"

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json().catch(() => ({}))
  const visitorId = typeof body.visitorId === "string" ? body.visitorId.trim() : ""
  if (!visitorId) return NextResponse.json({ error: "Identifiant visiteur requis." }, { status: 400 })
  if (typeof body.commentId === "string") {
    const existing = await db.select().from(commentLikeRecords).where(eq(commentLikeRecords.commentId, body.commentId))
    const hasLike = existing.some((like) => like.visitorId === visitorId)
    if (hasLike) { await db.delete(commentLikeRecords).where(and(eq(commentLikeRecords.commentId, body.commentId), eq(commentLikeRecords.visitorId, visitorId))); await db.update(poemComments).set({ likesCount: sql`greatest(${poemComments.likesCount} - 1, 0)` }).where(eq(poemComments.id, body.commentId)) } else { await db.insert(commentLikeRecords).values({ commentId: body.commentId, visitorId }); await db.update(poemComments).set({ likesCount: sql`${poemComments.likesCount} + 1` }).where(eq(poemComments.id, body.commentId)) }
    const [comment] = await db.select().from(poemComments).where(eq(poemComments.id, body.commentId))
    return NextResponse.json({ ...comment, liked: !hasLike })
  }
  const existing = await db.select().from(poemLikes).where(eq(poemLikes.poemId, id))
  const hasLike = existing.some((like) => like.visitorId === visitorId)
  if (hasLike) { await db.delete(poemLikes).where(and(eq(poemLikes.poemId, id), eq(poemLikes.visitorId, visitorId))); await db.update(poems).set({ likesCount: sql`greatest(${poems.likesCount} - 1, 0)` }).where(eq(poems.id, id)) } else { await db.insert(poemLikes).values({ poemId: id, visitorId }); await db.update(poems).set({ likesCount: sql`${poems.likesCount} + 1` }).where(eq(poems.id, id)) }
  const [poem] = await db.select().from(poems).where(eq(poems.id, id))
  if (!poem) return NextResponse.json({ error: "Poème introuvable." }, { status: 404 })
  return NextResponse.json({ ...poem, liked: !hasLike })
}
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) { const { id } = await params; const comments = await db.select().from(poemComments).where(eq(poemComments.poemId, id)).orderBy(asc(poemComments.createdAt)); return NextResponse.json(comments) }
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) { const { id } = await params; const body = await request.json(); const text = typeof body.text === "string" ? body.text.trim() : ""; if (!text) return NextResponse.json({ error: "Commentaire requis." }, { status: 400 }); const [comment] = await db.insert(poemComments).values({ poemId: id, parentId: typeof body.parentId === "string" ? body.parentId : null, text, author: typeof body.author === "string" && body.author.trim() ? body.author.trim() : "anonyme" }).returning(); return NextResponse.json(comment, { status: 201 }) }
