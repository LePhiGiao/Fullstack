import express from 'express'
const router = express.Router()
import apiController from '../controllers/apiController'
import userController from '../controllers/userController'

const initAPIRoute = (app) => {

    router.get('/test-api', apiController.testApi)
    router.post('/register', apiController.handleRegister)
    router.post('/login', apiController.handleLogin)


    // resFull API
    router.get('/user/read', userController.readFunc)
    router.post('/user/create', userController.createFunc)
    router.put('/user/update', userController.updateFunc)
    router.delete('/user/delete', userController.deleteFunc)


    return app.use('/api/v1', router);

}
export default initAPIRoute