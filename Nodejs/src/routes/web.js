import express from 'express'
const router = express.Router()
import homeController from '../controllers/homeController'

const initWebRoute = (app) => {
    router.get('/', homeController.handleHelloWorld)
    router.get('/user', homeController.handleUserPage)
    router.post('/user/create-user', homeController.handleCreateNewUser)
    router.post('/delete-user/:id', homeController.handleDeleteUser)
    router.get('/update-user/:id', homeController.getUpdateUserPage)
    router.post('/user/update-user', homeController.handleUpdateUserPage)


    return app.use('/', router);

}
export default initWebRoute