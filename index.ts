import express from "express"
import cors from "cors"
import { config } from "dotenv"

// Import Routes
import mediaRouter from "./routes/media.route"

config()

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())

// Register Routes
app.use("/media", mediaRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))