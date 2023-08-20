import express from 'express'
import configViewEngine from './configs/viewEngine'
import initWebRoute from './routes/web'
import bodyParser from 'body-parser'
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000;

//config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config viewEngine
configViewEngine(app)

//init route
initWebRoute(app)

app.listen(PORT, () => {
    console.log(`Example app listening on port:  http://localhost:${PORT}`)
})