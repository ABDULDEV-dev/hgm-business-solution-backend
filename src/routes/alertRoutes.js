import express from "express"
import { createAlert, getAlerts, resolveAlert } from "../controllers/alertController.js"
import { authenticate } from "../middleware/auth.js"

const router = express.Router()

router.get("/", getAlerts)
router.post("/", authenticate, createAlert)
router.put("/:id/resolve", authenticate, resolveAlert)

export default router
