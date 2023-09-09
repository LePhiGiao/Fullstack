import userService from '../service/userService'

const handleHelloWorld = (req, res) => {
    return res.render('home.ejs')
}

const handleUserPage = async (req, res) => {
    let userList = await userService.getUserList()
    // Cookies that have not been signed
    console.log('Cookies: ', req.cookies)

    res.cookie('test', 'test cookie')

    return res.render('user.ejs', { userList })
}
const handleCreateNewUser = (req, res) => {
    let { email, password, username } = req.body
    userService.createNewUser(email, password, username)
    return res.redirect('/user')
}
const handleDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id)
    return res.redirect('/user')
}
const getUpdateUserPage = async (req, res) => {
    let id = req.params.id
    let user = await userService.getUserById(id)
    let userData = user

    return res.render('userUpdate.ejs', { userData })
}
const handleUpdateUserPage = async (req, res) => {
    let { email, username, id } = req.body
    await userService.updateUserInfo(email, username, id)
    return res.redirect('/user')
}

module.exports = {
    handleHelloWorld, handleUserPage, handleCreateNewUser,
    handleDeleteUser, getUpdateUserPage, handleUpdateUserPage
}