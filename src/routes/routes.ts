import { Router } from "express";
import * as authView from "../views/auth_view"
import * as weatherView from "../views/weather_view"
import * as favouritesView from "../views/favourites_view"

const router = Router()

// Auth
router.post('/login', authView.login)
router.post('/signup', authView.signUp)
router.post("/logout", authView.logout)

// Weather
router.get('/weather', weatherView.getWeatherData)

// Favourites
router.get('/favourites', favouritesView.getFavourites)
router.post('/favourites/save', favouritesView.saveToFavourites)
router.delete('/favourites/remove/:id', favouritesView.removeFavourite)

export default router