import express from "express"
import router from "./routes/routes"
import { connectDB } from "./repos/db"
import dotenv from "dotenv"

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

dotenv.config()
connectDB()

app.use('/', router)

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`)
})