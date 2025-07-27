import express from "express"
import router from "./routes/routes"
import { connectDB } from "./repos/db"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json()) // To parse JSON request bodies
app.use(cookieParser()) // To parse cookies from request headers

// Replace with actual domain 
app.use(cors({
    origin: "https://localhost:5173", // Replace with actual frontend origin
    credentials: true       // To allow cookies
}))

dotenv.config()
connectDB()

app.use('/', router)

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`)
})