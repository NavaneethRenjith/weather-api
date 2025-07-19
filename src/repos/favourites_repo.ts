import { desc, eq } from "drizzle-orm";

import { getDb } from "./db";
import { favourites } from "../models/favourite";

import { FavouriteData, FavouriteIdResult, FavouritesResult } from "../interfaces/favourite_interface";
import { CustomError } from "../helpers/error_helper";

async function fetchFavouritesForUser(userId: number): Promise<FavouritesResult> {
    const db = getDb()

    const favouritesResult = await db.select()
        .from(favourites)
        .where(eq(favourites.userId, userId))
        .orderBy(desc(favourites.createdAt))

    return {
        data: favouritesResult,
        success: true
    }
}

async function insertIntoFavourites(data: FavouriteData): Promise<FavouriteIdResult> {
    const db = getDb()

    const result = await db.insert(favourites)
        .values(data)
        .returning()

    if (!result || result.length === 0) {
        throw new CustomError(500, "Internal server error", "Error inserting into favourites table")
    }

    return {
        data: result[0].id,
        success: true
    }
}

async function deleteFromFavourites(id: number): Promise<boolean> {
    const db = getDb()

    const result = await db.delete(favourites)
        .where(eq(favourites.id, id))
        .returning()

    if (!result || result.length === 0) {
        throw new CustomError(500, "Internal server error", "Error deleting from favourites table")
    }

    return true
}

export { fetchFavouritesForUser, insertIntoFavourites, deleteFromFavourites }