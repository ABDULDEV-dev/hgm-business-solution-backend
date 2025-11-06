import express from "express"
import { authenticate } from "../middlewares/auth.js"

const router = express.Router()

// Placeholder for future user management routes
router.get("/", authenticate, (req, res) => {
  res.json({ message: "User routes" })
})

export default router
