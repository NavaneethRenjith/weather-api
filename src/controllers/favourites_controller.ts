import { fetchFavouritesForUser, insertIntoFavourites, deleteFromFavourites } from "../repos/favourites_repo"

import { CustomError } from "../helpers/error_helper"
import { WeatherData } from "../interfaces/weather_interface"
import { FavouriteData } from "../interfaces/favourite_interface"

async function fetchFavourites(userId: number): Promise<Array<FavouriteData>> {
    try {
        const favouritesResult = await fetchFavouritesForUser(userId)
        if (favouritesResult.data == null) {
            return []
        }

        return favouritesResult.data
    } catch (error) {
        console.log(error)
        if (error instanceof CustomError) {
            throw error
        }
        throw new CustomError(500, "Internal Server Error")
    }
}

async function addToFavourites(data: WeatherData, userId: number): Promise<number | null> {
    try {
        // Validate vavourites data
        const favouritesData: FavouriteData = {
            ...data,
            userId: userId  
        }

        const result = await insertIntoFavourites(favouritesData)
        if (result.data == null) {
            throw new CustomError(500, "Internal server error")
        }

        return result.data
    } catch (error) {
        console.log(error)
        if (error instanceof CustomError) {
            throw error
        }
        throw new CustomError(500, "Internal Server Error")
    }
}

async function removeFromFavourites(id: number): Promise<boolean> {
    try {
        return await deleteFromFavourites(id)
    } catch (error) {
        console.log(error)  
        if (error instanceof CustomError) {
            throw error
        }
        throw new CustomError(500, "Internal Server Error")
    }
}

export { fetchFavourites, addToFavourites, removeFromFavourites }