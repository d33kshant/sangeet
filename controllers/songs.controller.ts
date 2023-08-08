import { Request, Response } from "express"
import Songs from "../models/songs.model"

export async function createSong(req: Request, res: Response) {
	res.json(await Songs.create(req.body))
}

export async function getSongById(req: Request, res: Response) {
	res.json(await Songs.findById(req.params.id))
}

export async function getSongs(_req: Request, res: Response) {
	res.json(await Songs.find({}, null, { limit: 10 }))
}