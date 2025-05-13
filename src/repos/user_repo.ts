import { eq } from "drizzle-orm"

import { getDb } from "./db"
import { users } from "../models/user"

import { CustomError } from "../helpers/error_helper"
import { UserIdResult, UserResult } from "../interfaces/user_interface"

export async function createUser(userName: string, password: string): Promise<UserIdResult> {
    const db = getDb()

    const user = await db?.insert(users)
        .values({
            userName: userName,
            password: password
        })
        .returning()

    if (user && user.length > 0) {
        return {
            data: user[0].id,
            success: true
        }
    }

    return {
        success: false,
        error: new CustomError(500, "DB Insertion Error")
    }
}

export async function findUserByUsername(userName: string): Promise<UserResult> {
    const db = getDb()

    const userResult = await db?.select()
        .from(users)
        .where(eq(users.userName, userName))
        .limit(1)

    if (!userResult || userResult.length === 0) {
        return {
            success: false,
            error: new CustomError(404, "User not found")
        }
    }

    return {
        data: userResult[0],
        success: true
    }
}