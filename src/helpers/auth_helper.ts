import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

import { CustomError } from "../helpers/error_helper"

dotenv.config()

const SALT_ROUNDS = 10
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string

async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUNDS)
}

async function verifyPassword(password: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword)
}

function generateToken(payload: object): string {
    if (!JWT_SECRET_KEY) {
        throw new CustomError(500, "Internal server error", "JWT secret key missing")
    }
    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "10d" })
}

function verifyToken(token: string): any {
    if (!JWT_SECRET_KEY) {
        throw new CustomError(500, "Internal server error", "JWT secret key missing")
    }
    return jwt.verify(token, JWT_SECRET_KEY)
}

export { hashPassword, verifyPassword, generateToken, verifyToken }