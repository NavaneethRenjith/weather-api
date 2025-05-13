import { getSessionId } from "../repos/session_repo"
import { verifyToken } from "../helpers/auth_helper"
import { CustomError } from "../helpers/error_helper"

// If authorized then returns user id
export async function validateAuthorization(token: string): Promise<number> {
    try {
        if (!token.startsWith("Bearer ")) {
            throw new CustomError(401, "Unauthorized")
        }

        const jwtToken = token.split(" ")[1]
        const payload = verifyToken(jwtToken)

        const session = await getSessionId(jwtToken)
        if (session.data == null) {
            throw new CustomError(401, "Unauthorized")
        }

        return payload.userId
    } catch (error) {
        if (error instanceof CustomError) {
            throw error;
        }
        throw new CustomError(401, "Unauthorized")
    }
}
