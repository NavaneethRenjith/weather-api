import { Request, Response } from "express";

import { fetchCurrentWeatherByCity, fetchCurrentWeatherByCoordinates } from "../controllers/weather_controller"

import { WeatherData } from "../interfaces/weather_interface";

import { isNullOrEmpty } from "../utilities/utilities"
import { CustomError } from "../helpers/error_helper"

export async function getWeatherData(req: Request, res: Response): Promise<void> {
    try {
        const city = req.query.city as string
        const lat = req.query.lat as string
        const long = req.query.long as string
        let data: WeatherData

        if (!isNullOrEmpty(city)) {
            const weatherResult = await fetchCurrentWeatherByCity(city)
            if (weatherResult.data == null) {
                throw new CustomError(404, "No data for given city")
            }
            data = weatherResult.data
            res.status(200).json({data : data})
        }
        else if (!isNullOrEmpty(lat) && !isNullOrEmpty(long)) {
            const weatherResult = await fetchCurrentWeatherByCoordinates(Number(lat), Number(long))
            if (weatherResult.data == null) {
                throw new CustomError(404, "No data for given coordinates")
            }
            data = weatherResult.data
            res.status(200).json({data: data})
        }
        else {
            res.status(400).json({
                message: "Bad request"
            })
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