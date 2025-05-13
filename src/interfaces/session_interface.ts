import { RepoResult } from "./repo_interface"

interface Session {
    id: number
    userId: number
    token: string
    createdAt: Date | null
}

interface SessionResult extends RepoResult<Session | null> { }
interface SessionIdResult extends RepoResult<number | null> { }
interface SessionUpdateResult extends RepoResult<boolean | null> { }

export { SessionResult, SessionIdResult, SessionUpdateResult }