import express from 'express'
const router = express.Router()
import apiController from '../controllers/apiController'

const initAPIRoute = (app) => {

    router.get('/test-api', apiController.testApi)
    router.post('/register', apiController.handleRegister)
    router.post('/login', apiController.handleLogin)

    return app.use('/api/v1', router);

}
export default initAPIRoute