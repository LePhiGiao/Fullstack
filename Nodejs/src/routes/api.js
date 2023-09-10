import express from 'express'
const router = express.Router()
import apiController from '../controllers/apiController'
import userController from '../controllers/userController'
import groupController from '../controllers/groupController'
import { checkUserJWT, checkUserPermission } from '../middleware/JWTAction'

// const checkUser = (req, res, next) => {
//     let nonSecurePaths = ['/register', '/login']
//     if (nonSecurePaths.includes(req.path)) {
//         return next()
//     }
//     next()
// }

const initAPIRoute = (app) => {
    router.all('*', checkUserJWT, checkUserPermission)

    router.get('/test-api', apiController.testApi)
    router.post('/register', apiController.handleRegister)
    router.post('/login', apiController.handleLogin)

    //api handle reload
    router.get('/account', userController.getUserAccount)


    // resFull API
    router.get('/user/read', userController.readFunc)
    router.post('/user/create', userController.createFunc)
    router.put('/user/update', userController.updateFunc)
    router.delete('/user/delete', userController.deleteFunc)

    router.get('/group/read', groupController.readFunc)


    return app.use('/api/v1', router);

}
export default initAPIRoute