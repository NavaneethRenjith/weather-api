import { getSessionId, createSession, deleteSession } from "../repos/session_repo"
import { createUser, findUserByUsername } from "../repos/user_repo"
import { LoginData } from "../interfaces/login_interface"
import { CustomError } from "../helpers/error_helper"
import { hashPassword, verifyPassword, generateToken } from "../helpers/auth_helper"


async function loginUser(userName: string, password: string): Promise<LoginData | null> {
    try {
        // Check if user exists
        const userResult = await findUserByUsername(userName)
        const user = userResult.data
        if (user == null) throw userResult.error ?? new CustomError(404, "User not found")

        // Compare hashed passwords
        const passwordMatch = await verifyPassword(password, user.password)
        if (!passwordMatch) throw new CustomError(401, "Wrong username or password")

        // What if alreay logged in?

        // Create JWT token
        const tokenPayload = { userId: user.id }
        const token = generateToken(tokenPayload)

        const newSessionResult = await createSession(user.id, token)
        const sessionId = newSessionResult.data
        if (sessionId == null) return null

        return {
            token: token
        }
    } catch (error) {
        console.log(error)
        if (error instanceof CustomError) {
            throw error
        }
        throw new CustomError(500, "Internal Server Error")
    }
}

async function signupUser(userName: string, password: string): Promise<LoginData | null> {
    try {
        const existingUser = (await findUserByUsername(userName)).data
        if (existingUser != null) {
            throw new CustomError(400, "Username already exists")
        }

        const hashedPassword = await hashPassword(password)

        // Create new user
        const userResult = await createUser(userName, hashedPassword)
        const userId = userResult.data
        if (userId == null) return null

        // Create JWT token
        const tokenPayload = { userId: userId }
        const token = generateToken(tokenPayload)

        // Create new session for user
        const sessionResult = await createSession(userId, token)
        const sessionId = sessionResult.data
        if (sessionId == null) return null

        return {
            token: token
        }
    } catch (error) {
        console.log(error)
        if (error instanceof CustomError) {
            throw error
        }
        throw new CustomError(500, "Internal Server Error")
    }
}

async function logoutUser(token: string): Promise<boolean> {
    try {
        const sessionIdResult = await getSessionId(token)
        const sessionId = sessionIdResult.data

        if (sessionId == null || !sessionIdResult.success) {
            throw new CustomError(404, "User is already logged out")
        }

        const isSuccess = await deleteSession(sessionId)
        if (!isSuccess) {
            throw new CustomError(500, "Logout failed")
        }

        return true
    } catch (error) {
        console.log(error)
        if (error instanceof CustomError) {
            throw error
        }
        throw new CustomError(500, "Internal Server Error")
    }
}

export { signupUser, loginUser, logoutUser }