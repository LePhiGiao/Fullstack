import express from 'express'
import configViewEngine from './config/viewEngine'
import initWebRoute from './routes/web'
import bodyParser from 'body-parser'
import connection from './config/connectDB'
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000;

//config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config viewEngine
configViewEngine(app)

//test connectionDB
connection()

//init route
initWebRoute(app)

app.listen(PORT, () => {
    console.log(`Example app listening on port:  http://localhost:${PORT}`)
})