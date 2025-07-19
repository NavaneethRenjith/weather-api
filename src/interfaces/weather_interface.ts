import { APIResult } from "./api_interface"

interface WeatherData {
    temp: string
    humidity?: number | null
    description?: string | null,
    lat: number,
    lon: number,
    city?: string | null
    image?: string | null
}

interface WeatherResult extends APIResult<WeatherData | null> { }

export { WeatherData, WeatherResult }
