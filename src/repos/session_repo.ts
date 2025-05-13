import { eq } from "drizzle-orm"

import { getDb } from "./db"
import { sessions } from "../models/session"
import { SessionIdResult, SessionUpdateResult } from "../interfaces/session_interface"
import { CustomError } from "../helpers/error_helper"

async function getSessionId(token: string): Promise<SessionIdResult> {
    const db = getDb()

    const session = await db?.select()
        .from(sessions)
        .where(eq(sessions.token, token))
        .limit(1)

    if (!session || session.length === 0) {
        return {
            success: false
        }
    }

    return {
        data: session[0].id,
        success: true
    }
}

async function createSession(userId: number, token: string): Promise<SessionIdResult> {
    const db = getDb()

    const session = await db?.insert(sessions)
        .values({
            userId: userId,
            token: token
        })
        .returning()

    if (!session || session.length === 0) {
        return {
            success: false,
            error: new CustomError(500, "Internal server error", "Error creating user")
        }
    }

    return {
        data: session[0].id,
        success: true
    }
}

async function deleteSession(id: number): Promise<SessionUpdateResult> {
    const db = getDb()

    const result = await db?.delete(sessions)
        .where(eq(sessions.id, id))

    if (!result) {
        return {
            data: false,
            success: false,
            error: new CustomError(500, "Internal server error", "Error updating session")
        }
    }

    if (result) return { data: result.changes > 0, success: true }

    return {
        data: false,
        success: false
    }
}

export { getSessionId, createSession, deleteSession }