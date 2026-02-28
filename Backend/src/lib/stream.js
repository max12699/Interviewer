import pkg from "stream-chat"
import { ENV } from "./env.js"

const { StreamChat } = pkg

const apiKey = ENV.STREAM_API_KEY
const apiSecret = ENV.STREAM_API_SECRET

if (!apiKey || !apiSecret) {
  console.error("STREAM_API_KEY or STREAM_API_SECRET is missing")
}

export const chatClient = new StreamChat(apiKey, apiSecret)

export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUsers([userData])
    console.log("✅ Stream user upserted successfully", userData.id)
  } catch (error) {
    console.error("❌ Error upserting Stream user:", error.message)
    throw error
  }
}

export const deleteStreamUser = async (userId) => {
  try {
    await chatClient.deleteUser(userId)
    console.log("🗑️ Stream user deleted successfully", userId)
  } catch (error) {
    console.error("❌ Error deleting Stream user:", error.message)
    throw error
  }
}