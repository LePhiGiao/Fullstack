require('dotenv').config()
import express from 'express'
import configViewEngine from './config/viewEngine'
import initWebRoute from './routes/web'
import initAPIRoute from './routes/api'
import bodyParser from 'body-parser'
import connection from './config/connectDB'
import configCORS from './config/cors'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = process.env.PORT || 8081;

//config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config CORS
configCORS(app)

//config viewEngine
configViewEngine(app)

//test connectionDB
connection()

//config cookie-parser
app.use(cookieParser())

//init route
initWebRoute(app)

//api route
initAPIRoute(app)

app.use((req, res) => {
    return res.send('404 Not Found')
})

app.listen(PORT, () => {
    console.log(`Example app listening on port:  http://localhost:${PORT}`)
})