import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./user";
import { sql } from "drizzle-orm";

export const favourites = sqliteTable('favourites', {
    id: integer('id').primaryKey(),
    userId: integer('userId').references(() => users.id).notNull(),
    temp: text('temp').notNull(),
    humidity: integer('humidity'),
    description: text('description'),
    image: text('image'),
    lat: integer('lat').notNull(),
    lon: integer('lon').notNull(),
    city: text('city'),
    createdAt: text('createdAt').notNull().default(sql`(current_timestamp)`)
})