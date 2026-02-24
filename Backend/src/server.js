import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import { ENV } from "./lib/env.js"

const app = express()

// Fix __dirname for ES modules
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

app.listen(ENV.PORT, () =>
  console.log(`Server is running on port: ${ENV.PORT}`)
)