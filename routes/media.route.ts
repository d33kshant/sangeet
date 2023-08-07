import { Router } from "express"
import { stream } from "../controllers/media.controller"

const router = Router()

router.get('/stream', stream)

export default router