import { integer, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const poems = pgTable("poems", { id: uuid("id").defaultRandom().primaryKey(), title: text("title").notNull(), topics: jsonb("topics").$type<string[]>().notNull().default([]), text: text("text").notNull(), author: text("author").notNull().default("anonyme"), likesCount: integer("likes_count").notNull().default(0), createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow() })
export const poemComments = pgTable("poem_comments", { id: uuid("id").defaultRandom().primaryKey(), poemId: uuid("poem_id").notNull(), author: text("author").notNull().default("anonyme"), text: text("text").notNull(), createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow() })
