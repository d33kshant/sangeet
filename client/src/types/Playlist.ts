import Song from "./Song"

export default interface Playlist {
	_id: string,
	title: string,
	description: string,
	songs: { song: Song, time_added: string }[]
	album_art: string,
	is_album: boolean,
	createdAt: Date,
	updatedAt: Date,
}