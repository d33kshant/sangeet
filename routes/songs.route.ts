import { Router } from "express"
import { createSong, getSongById, getSongs } from "../controllers/songs.controller"

const router = Router()

router.get("/", getSongs)
router.post("/", createSong)

router.get("/:id", getSongById)

export default router