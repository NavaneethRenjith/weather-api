import { RepoResult } from "./repo_interface"

interface User {
    id: number
    userName: string
    password: string
}

export interface UserResult extends RepoResult<User | null> { }
export interface UserIdResult extends RepoResult<number | null> { }