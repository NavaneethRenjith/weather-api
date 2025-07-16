import { getSessionId } from "../repos/session_repo"
import { verifyToken } from "../helpers/auth_helper"
import { Request, Response, NextFunction } from "express"

// If authorized then returns user id
export async function validateAuthorization(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" })    
        }

        const payload = verifyToken(token) as { userId: number }
        req.userId = payload.userId
        req.token = token

        const session = await getSessionId(token)
        if (session.data == null) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        next()
    } catch (error: any) {
        if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid or expired token" })
        }
        res.status(500).json({ message: "Internal Server Error" })
    }
}
