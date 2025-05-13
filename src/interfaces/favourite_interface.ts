import { WeatherData } from "./weather_interface"
import { RepoResult } from "./repo_interface"

export interface FavouriteData extends WeatherData {
    userId: number
}

export interface FavouritesResult extends RepoResult<Array<FavouriteData> | null> { }
export interface FavouriteIdResult extends RepoResult<number | null> { }