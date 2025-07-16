import { RequestHandler, Router } from "express";
import * as authView from "../views/auth_view"
import * as weatherView from "../views/weather_view"
import * as favouritesView from "../views/favourites_view"

import { validateAuthorization } from "../middleware/auth_middleware";

const router = Router()

// Auth
router.post('/login', authView.login)
router.post('/signup', authView.signUp)
router.post("/logout", validateAuthorization as RequestHandler, authView.logout)

// Weather
router.get('/weather', weatherView.getWeatherData)

// Favourites
router.get('/favourites', validateAuthorization as RequestHandler, favouritesView.getFavourites)
router.post('/favourites/save', validateAuthorization as RequestHandler, favouritesView.saveToFavourites)
router.delete('/favourites/remove/:id', validateAuthorization as RequestHandler, favouritesView.removeFavourite)

export default router