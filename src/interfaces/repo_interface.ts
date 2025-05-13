import { CustomError } from "../helpers/error_helper"

export interface RepoResult<T> {
    data?: T
    success: boolean
    error?: CustomError
}