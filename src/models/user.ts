import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

// Dribble doesnt have table schema support for sqlite hence using sqliteTable() instead of schema.table()
export const users = sqliteTable('users', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userName: text('userName').notNull().unique(),
    password: text('password').notNull() // Store hashed password
})  