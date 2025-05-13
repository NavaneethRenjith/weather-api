import { APIResult } from "./api_interface"

interface WeatherData {
    minTemp: string
    maxTemp: string
    humidity?: number | null
    description?: string | null,
    lat: number,
    lon: number,
    city?: string | null
}

interface WeatherResult extends APIResult<WeatherData | null> { }

export { WeatherData, WeatherResult }
