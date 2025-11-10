import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/database.js"
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import transactionRoutes from "./routes/transactionRoutes.js"
import alertRoutes from "./routes/alertRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import { errorHandler } from "./middlewares/errorHandler.js"

dotenv.config()

const app = express()

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect to Database
connectDB()

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/transactions", transactionRoutes)
app.use("/api/alerts", alertRoutes)
app.use("/api/users", userRoutes)

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is running" })
})

// Error Handler (must be last)
// app.use(errorHandler)

// Start Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
