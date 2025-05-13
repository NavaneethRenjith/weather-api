export class CustomError extends Error {
    statusCode: number
    error?: String

    constructor(statusCode: number, message: string, error?: String) {
        super(message)
        this.statusCode = statusCode
        this.error = error
    }
}