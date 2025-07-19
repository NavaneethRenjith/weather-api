import axios from "axios"
import { OWM_API_URLS, WEATHER_IMAGE_CONSTANTS } from "../constants/urls"

import { WeatherData, WeatherResult } from "../interfaces/weather_interface"
import { CoordinatesData } from "../interfaces/location_interface"

import { CustomError } from "../helpers/error_helper"
import { convertKelvinToCelcius } from "../helpers/temperature_helper"

// Function to get weather data for a city
export async function fetchCurrentWeatherByCity(city: string): Promise<WeatherResult> {
    try {
        const coordinates = await getCoordinatesForCity(city)
        const lat = coordinates.lat
        const lon = coordinates.lon

        const weatherResult = await fetchCurrentWeatherByCoordinates(lat, lon)
        let weatherData = weatherResult.data

        if (weatherData != null) {
            weatherData.city = city
        }

        return {
            data: weatherData,
            success: true
        }
    } catch (error) {
        console.log(error)
        if (error instanceof CustomError) {
            throw error
        }
        throw new CustomError(500, "Internal Server Error")
    }
}

// Function to call Current weather API to get weather data for coordinates
export async function fetchCurrentWeatherByCoordinates(lat: string, lon: string): Promise<WeatherResult> {
    try {
        const baseUrl = OWM_API_URLS.CURRENT_WEATHER_API_URL
        const response = await axios.get(baseUrl, {
            params: { lat: lat, lon: lon, appid: process.env.OWM_API_KEY }
        })

        const iconCode: string = response.data.weather[0].icon 
        const data: WeatherData = {
            temp: convertKelvinToCelcius(response.data.main.temp),
            lat: Number(lat),
            lon: Number(lon),
            humidity: response.data.main.humidity,
            description: response.data.weather[0].description,
            image: `${WEATHER_IMAGE_CONSTANTS.WEATHER_ICON_URLS}${iconCode}${WEATHER_IMAGE_CONSTANTS.ICON_SIZE}`
        }

        return {
            data: data,
            success: true
        }
    } catch (error) {
        console.log(error)
        if (error instanceof CustomError) {
            throw error
        }
        throw new CustomError(500, "Internal Server Error")
    }
}

// Function to call Geocoding API to get coordinates for city
async function getCoordinatesForCity(city: String): Promise<CoordinatesData> {
    try {
        const baseUrl = OWM_API_URLS.GEOCODING_API_URL
        const response = await axios.get(baseUrl, {
            params: { q: city, limit: 1, appid: process.env.OWM_API_KEY }
        })

        if (response.data == null || !Array.isArray(response.data) || response.data.length === 0) {
            throw new CustomError(404, "Could not find coordinates of given city")
        }
        const lat = response.data[0]?.lat
        const lon = response.data[0]?.lon

        if (lat == null || lon == null) {
            throw new CustomError(500, "Invalid location")
        }

        return {
            lat: lat,
            lon: lon
        }
    } catch (error) {
        console.log(error)
        if (error instanceof CustomError) {
            throw error
        }
        throw new CustomError(500, "Internal Server Error")
    }
}