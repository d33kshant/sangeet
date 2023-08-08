import express from "express"
import cors from "cors"
import { config } from "dotenv"
import mongoose from "mongoose"

// Import Routes
import mediaRouter from "./routes/media.route"

config()

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())

// Register Routes
app.use("/media", mediaRouter)

mongoose.connect(process.env.MONGO_DB!)
	.then(() => {
		console.log("Mongoose connected with database")
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
	})
	.catch(console.error)