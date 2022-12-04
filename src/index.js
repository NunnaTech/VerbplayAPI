import app from "./app.js";
import {createConnection} from './database.js'

createConnection()
app.listen(3000)
console.log('Running in port 3000')