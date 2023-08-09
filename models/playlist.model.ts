import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
	title: {
		type: String,
		requierd: true
	},
	description: {
		type: String,
		requierd: false
	},
	songs: {
		type: [String],
		default: [],
	},
	album_art: {
		type: String,
		required: false,
	},
	is_album: {
		type: Boolean,
		default: false,
	}
}, { timestamps: true })

export default mongoose.model('Playlist', playlistSchema)