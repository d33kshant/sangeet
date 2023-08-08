import { Router } from "express";
import { createPlaylist, getPlaylistById } from "../controllers/playlist.controller";

const router = Router()

router.post('/', createPlaylist)
router.get('/:id', getPlaylistById)

export default router