import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

const sequelize = new Sequelize(
  process.env.DB_NAME || "hgm_db",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
)

const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log("✅ MySQL connected successfully")
    // Sync all models with the database
    await sequelize.sync({ alter: true })
    console.log("✅ Database models synced")
  } catch (error) {
    console.error("❌ MySQL connection failed:", error.message)
    process.exit(1)
  }
}

export { sequelize, connectDB }
