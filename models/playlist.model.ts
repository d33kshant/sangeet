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
	songs: [{
		song: { type: mongoose.Types.ObjectId, ref: 'Song' },
		time_added: Date
	}],
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