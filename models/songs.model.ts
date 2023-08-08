import mongoose from "mongoose"

const songSchema = new mongoose.Schema({
	title: String,
	artist: String,
	album_art: String,
	duration: String,
})

export default mongoose.model('Song', songSchema)