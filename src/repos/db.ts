import { BetterSQLite3Database, drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3'

import { CustomError } from '../helpers/error_helper';

let db: ReturnType<typeof drizzle> | null = null

export function connectDB() {
    if (!db) {
        try {
            const sqlite = new Database('db.sqlite');
            db = drizzle({ client: sqlite })

            //TODO: Replace with migrations
            sqlite.exec(`
                CREATE TABLE IF NOT EXISTS users (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  userName TEXT NOT NULL UNIQUE,
                  password TEXT NOT NULL
                );
            
                CREATE TABLE IF NOT EXISTS sessions (
                  id INTEGER PRIMARY KEY,
                  userId INTEGER NOT NULL,
                  token TEXT NOT NULL,
                  createdAt INTEGER,
                  FOREIGN KEY (userId) REFERENCES users(id)
                );
            
                CREATE TABLE IF NOT EXISTS favourites (
                  id INTEGER PRIMARY KEY,
                  userId INTEGER NOT NULL,
                  temp TEXT NOT NULL,
                  humidity INTEGER,
                  description TEXT,
                  image TEXT,
                  lat INTEGER NOT NULL,
                  lon INTEGER NOT NULL,
                  city TEXT,
                  createdAt TEXT,
                  FOREIGN KEY (userId) REFERENCES users(id)
                );
            `);


            console.log("Database connected")
        } catch (error) {
            console.log("Database initialization failed", error)
            throw new CustomError(500, "Internal server error", "Database initialization failed")
        }
    }

    return db
}

export function getDb() {
    if (!db) {
        console.log("Database not initialized")
        throw new CustomError(500, "Internal server error", "Database not initialized")
    }
    return db
}
