import express from "express"
import { createTransaction, getTransactions, getTransactionById } from "../controllers/transactionController.js"
import { authenticate } from "../middleware/auth.js"

const router = express.Router()

router.get("/", getTransactions)
router.get("/:id", getTransactionById)
router.post("/", authenticate, createTransaction)

export default router
