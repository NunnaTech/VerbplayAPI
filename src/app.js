import express from 'express'
import verbsRoutes from "./routes/verbs.js";
import userRoutes from './routes/users.js'

const app = express()
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})
// Interpretar el json dentro de request
app.use(express.json())
app.use(verbsRoutes)
app.use(userRoutes)

export default app