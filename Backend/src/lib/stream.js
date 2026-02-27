import {streamChat} from "stream-chat"

import {ENV} from "./env"

const apiKey = ENV.STREAM_API_KEY
const apiSecret = ENV.STREAM_API_SECRET

if (!apiKey || !apiSecret) {
    console.error("STREAM_API_KEY or STREAM_API_SECRET is missing")
}

export const chatClient = streamChat.getInstance(apiKey, apiSecret)

export const upsertStreamUser = async (userData) => {
    try {
        await chatClient.upsertStreamUser([userData])
        console.log("stream user upserting successfully", userData)
    } catch (error) {
        console.error("Error upserting Stream user:", error)
    }
}
export const deleteStreamUser = async (userId) => {
    try {
        await chatClient.deleteStreamUser(userId)
        console.log("stream user deleted successfully", userId)
    } catch (error) {
        console.error("Error deleting the Stream user:", error)
    }
}