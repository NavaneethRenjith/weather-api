import { Request, Response } from "express";
import { CustomError } from "../helpers/error_helper";
import { loginUser, logoutUser, signupUser } from "../controllers/auth_controller";
import { validateAuthorization } from "../middleware/auth_middleware";

export async function login(req: Request, res: Response): Promise<void> {
    try {
        const { userName, password } = req.body

        if (!userName || !password) {
            res.status(400).json({
                message: "Username and password are required"
            })
            return
        }

        const loginData = await loginUser(userName, password)
        if (loginData == null) {
            throw new CustomError(500, "Error logging in user")
        }
        res.status(200).json({ message: "Login successful", token: loginData.token })
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({
                message: error.message
            })
        }
        else {
            res.status(500).json({ message: "Internal Server Error" })
        }
    }
}

export async function signUp(req: Request, res: Response): Promise<void> {
    try {
        const { userName, password } = req.body

        if (!userName || !password) {
            res.status(400).json({ message: "Username and password are required" })
            return
        }

        const loginData = await signupUser(userName, password)
        if (loginData == null) {
            throw new CustomError(500, "Error signing up user")
        }
        res.status(200).json({ message: "Sign up successful", token: loginData.token })
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({
                message: error.message
            })
        }
        else {
            res.status(500).json({ message: "Internal Server Error" })
        }
    }
}

export async function logout(req: Request, res: Response): Promise<void> {
    try {
        const token = req.headers.authorization?.split("")[1]
        if (!token) {
            res.status(400).json({ message: "No token provided" })
            return
        }
        await validateAuthorization(token)

        if (await logoutUser(token)) {
            res.status(200).json({ message: "Logout successful" })
        }
        else {
            res.status(500).json({ message: "Logout unsuccessful" })
        }
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({
                message: error.message
            })
        }
        else {
            res.status(500).json({ message: "Internal Server Error" })
        }
    }
}