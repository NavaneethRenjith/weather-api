import { Request, Response } from "express";

import { fetchFavourites, addToFavourites, removeFromFavourites } from "../controllers/favourites_controller";
import { CustomError } from "../helpers/error_helper"; 
import { validateWeatherData } from "../helpers/weather_helper";

async function getFavourites(req: Request, res: Response): Promise<void> {
    try {
        const userId = req.userId
        
        if (!userId) {
           res.status(401).json({ message: "Unauthorized" }) 
           return
        }

        const favourites = await fetchFavourites(userId)
        res.status(200).json({data: favourites})

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