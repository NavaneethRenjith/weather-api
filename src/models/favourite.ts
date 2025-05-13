import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./user";

export const favourites = sqliteTable('favourites', {
    id: integer('id').primaryKey(),
    userId: integer('userId').references(() => users.id).notNull(),
    minTemp: text('minTemp').notNull(),
    maxTemp: text('maxTemp').notNull(),
    humidity: integer('humidity'),
    description: text('description'),
    lat: integer('lat').notNull(),
    lon: integer('lon').notNull(),
    city: text('city')
})