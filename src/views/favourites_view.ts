import { Request, Response } from "express";

import { fetchFavourites, addToFavourites, removeFromFavourites } from "../controllers/favourites_controller";
import { CustomError } from "../helpers/error_helper";
import { validateAuthorization } from "../middleware/auth_middleware";
import { validateWeatherData } from "../helpers/weather_helper";

async function getFavourites(req: Request, res: Response): Promise<void> {
    try {
        const token = req.headers.authorization
        if (!token) {
            res.status(401).json({ message: "Unauthorized" })
            return
        }

        const userId = await validateAuthorization(token)
        const favourites = await fetchFavourites(userId)

        res.status(200).json(favourites)

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
        const token = req.headers.authorization
        if (!token) {
            res.status(401).json({ message: "Unauthorized" })
            return
        }

        const userId = await validateAuthorization(token)

        const weather = req.body
        if (weather == null) {
            res.status(400).json({ message: "Weather data missing" })
            return
        }

        if (!validateWeatherData(weather)) {
            res.status(400).json({ message: "Invalid weather data" })
            return
        }

        const favourite = await addToFavourites(weather, userId)
        if (favourite != null) {
            res.status(200).json({ "message": "Saved to favourites" })
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
        const token = req.headers.authorization
        if (!token) {
            res.status(401).json({ message: "Unauthorized" })
            return
        }

        await validateAuthorization(token)

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