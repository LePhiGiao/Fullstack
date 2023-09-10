import loginResgisterService from '../service/loginRegisterService'

const testApi = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'test API'
    })
}

const handleRegister = async (req, res) => {
    try {

        //validate data
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'Missing required parameters', //error message
                EC: '-1', //error code
                DT: '', // Data
            })
        }
        if (req.body.password && req.body.password.length < 4) {
            return res.status(200).json({
                EM: 'Password is more than 4 letters', //error message
                EC: '-1', //error code
                DT: '', // Data
            })
        }

        //service: create user
        let data = await loginResgisterService.registerNewUser(req.body)

        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: '', // Data
        })
    }
    catch (e) {
        return res.status(500).json({
            EM: 'Error from server', //error message
            EC: '-1', //error code
            DT: '', // Data

        })
    }
}

const handleLogin = async (req, res) => {
    try {
        let data = await loginResgisterService.handleUserLogin(req.body)

        //set cookies
        if (data && data.DT && data.DT.access_token) {
            res.cookie('jwt', data.DT.access_token, { httpOnly: true })
        }

        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT, // Data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'Error from server', //error message
            EC: '-1', //error code
            DT: '', // Data

        })
    }
}

module.exports = {
    testApi, handleRegister, handleLogin
}