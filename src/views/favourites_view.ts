import { Request, Response } from "express";

import { fetchFavourites, addToFavourites, removeFromFavourites, updateFavourites } from "../controllers/favourites_controller";
import { CustomError } from "../helpers/error_helper"; 
import { validateWeatherData } from "../helpers/weather_helper";
import { getUpdatedWeatherForFavourites } from "../controllers/weather_controller"
import { FavouriteData } from "../interfaces/favourite_interface";

async function getFavourites(req: Request, res: Response): Promise<void> {
    try {
        const userId = req.userId
        
        if (!userId) {
           res.status(401).json({ message: "Unauthorized" }) 
           return
        }

        const favourites = await fetchFavourites(userId)

        // Get latest weather data for favourites
        const updatedWeatherResult = await getUpdatedWeatherForFavourites(favourites)
        
        const updatedFavourites: FavouriteData[] = favourites.map((fav, index) => {
            const weatherData = updatedWeatherResult[index].data
            if(!weatherData) {
                // If weather failed, return original
                return fav
            }
            
            return {
                ...fav,
                temp: weatherData.temp,
                humidity: weatherData.humidity,
                description: weatherData.description,
                image: weatherData.image
            }
        })
        
        res.status(200).json({data: updatedFavourites})

        // Update favourites table
        updateFavourites(favourites, updatedFavourites)
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

async function saveToFavourites(req: Request, res: Response): Promise<void> {
    try {
        const userId = req.userId
        if (!userId) {
           res.status(401).json({ message: "Unauthorized" }) 
           return
        }

        const weather = req.body
        if (weather == null) {
            res.status(400).json({ message: "Weather data missing" })
            return
        }

        if (!validateWeatherData(weather)) {
            res.status(400).json({ message: "Invalid weather data" })
            return
        }

        const favouriteId = await addToFavourites(weather, userId)
        if (favouriteId != null) {
            res.status(200).json({ message: "Saved to favourites", data: { ...weather, id: favouriteId }})
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

async function removeFavourite(req: Request, res: Response) {
    try {
        const id = Number(req.params.id)

        const result = await removeFromFavourites(id)
        if (result) {
            res.status(200).json({ "message": "Removed from favourites" })
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

export { getFavourites, saveToFavourites, removeFavourite }