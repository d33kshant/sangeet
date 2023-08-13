import { Router } from "express";
import { createPlaylist, getPlalists, getPlaylistById } from "../controllers/playlist.controller";

const router = Router()

router.post('/', createPlaylist)
router.get('/', getPlalists)
router.get('/:id', getPlaylistById)

export default router