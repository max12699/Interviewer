import mongoose from "mongoose"
import { ENV } from "./env.js"

let isConnected = false

export const connectDB = async () => {
  try {
    if (isConnected) return

    if (!ENV.DB_URL) {
      throw new Error("DB_URL is not defined")
    }

    const conn = await mongoose.connect(ENV.DB_URL)

    isConnected = conn.connections[0].readyState === 1

    console.log("✅ MongoDB Connected")
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message)
    process.exit(1)
  }
}