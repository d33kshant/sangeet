import express from "express"
import cors from "cors"
import { config } from "dotenv"
import mongoose from "mongoose"

// Import Routes
import mediaRouter from "./routes/media.route"
import songsRouter from "./routes/songs.route"
import playlistRouter from "./routes/playlist.route"

config()

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())

// Register Routes
app.use("/media", mediaRouter)
app.use("/songs", songsRouter)
app.use("/playlist", playlistRouter)

mongoose.connect(process.env.MONGO_DB!)
	.then(() => {
		console.log("Mongoose connected with database")
		const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

		const gracefulShutdown = (signal: string) => {
			process.on(signal, async () => {
				server.close()
				await mongoose.disconnect()
				console.log(`Server closed with ${signal}`)
				process.exit(0)
			})
		}

		["SIGTERM", "SIGINT"].forEach(signal => gracefulShutdown(signal))
	})
	.catch(console.error)