import { WeatherData } from "../interfaces/weather_interface";

export function validateWeatherData(data: Partial<WeatherData>): Boolean {
    return data.temp != null && data.lat != null && data.lon != null
}