import { Request, Response } from "express"
import Playlist from "../models/playlist.model"

export async function createPlaylist(req: Request, res: Response) {
	res.json(await Playlist.create(req.body))
}

export async function getPlaylistById(req: Request, res: Response) {
	res.json(await Playlist.findById(req.params.id).populate("songs.song"))
}

export async function getPlalists(req: Request, res: Response) {
	res.json(await Playlist.aggregate([{
		$addFields: {
			songs: { "$size": "$songs" }
		}
	}]))
}