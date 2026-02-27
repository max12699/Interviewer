import express from "express"
import path from "path"
import cors from "cors"
import { fileURLToPath } from "url"
import { ENV } from "./lib/env.js"
import { connectDB } from "./lib/db.js"
import { serve } from "inngest/express"
import { inngest, functions } from "./lib/inngest.js"

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORS
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }))

// Inngest Route
app.use("/api/inngest", serve({ client: inngest, functions }))

// ES Module __dirname fix
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log("PORT:", ENV.PORT)
console.log("DB_URL:", ENV.DB_URL)

app.get("/", (req, res) => {
  res.status(200).json({ msg: "API is up and running" })
})

// Serve frontend in production
if (ENV.NODE_ENV === "production") {
  const frontendPath = path.join(
    __dirname,
    "../../Frontend/interviewer/dist"
  )

  app.use(express.static(frontendPath))

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"))
  })
}

const startServer = async () => {
  try {
    await connectDB()

    app.listen(ENV.PORT, () => {
      console.log(`Server is running on port: ${ENV.PORT}`)
    })
  } catch (error) {
    console.error("Error starting server:", error)
  }
}

startServer()