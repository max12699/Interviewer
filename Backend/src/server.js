import express from "express"
import path from "path"
import cors from "cors"
import { fileURLToPath } from "url"
import { ENV } from "./lib/env.js"
import { connectDB } from "./lib/db.js"
import { serve } from "inngest/express"
import { inngest } from "./lib/inngest.js"

const app = express()

// middleware
app.use(express.join())
//Credentials : true meanning?? => server allow a broswer to include cookies on req
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }))

app.use("/api/inngest", serve({ client: inngest, functions }))

//  __dirname for ES modules
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

  app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"))
  })
}

const startServer = async () => {
  try {
    app.listen(ENV.PORT, async () => {
      await connectDB()
      console.log(`Server is running on port: ${ENV.PORT}`)
    })
  } catch (error) {
    console.error("error starting the server ", error)
  }
}

startServer()