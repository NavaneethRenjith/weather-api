import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { users } from "./user";

export const sessions = sqliteTable('sessions', {
    id: integer('id').primaryKey(),
    userId: integer('userId').notNull().references(() => users.id),
    token: text('token').notNull(),
    createdAt: integer('createdAt', { mode: 'timestamp' })
})