import express from 'express'
import verbsRoutes from "./routes/verbs.js";

const app = express()
// Interpretar el json dentro de request
app.use(express.json())
app.use(verbsRoutes)

export default app