export function isNullOrEmpty(str: string | null | undefined): Boolean {
    return !str || str.trim().length === 0
}