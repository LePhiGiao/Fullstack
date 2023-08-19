import express from 'express'
import configViewEngine from './configs/viewEngine'
import initWebRoute from './routes/web'
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000;

configViewEngine(app)

initWebRoute(app)

app.listen(PORT, () => {
    console.log(`Example app listening on port:  http://localhost:${PORT}`)
})