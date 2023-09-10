
import userAPIservice from '../service/userAPIservice'

const readFunc = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page
            let limit = req.query.limit
            let data = await userAPIservice.getUserWithPagination(+page, +limit)
            return res.status(200).json({
                EM: data.EM, //error message
                EC: data.EC, //error code
                DT: data.DT, // Data
            })
        }
        else {
            let data = await userAPIservice.getAllUser()
            return res.status(200).json({
                EM: data.EM, //error message
                EC: data.EC, //error code
                DT: data.DT, // Data
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'Error from server', //error message
            EC: '-1', //error code
            DT: '', // Data

        })
    }
}

const createFunc = async (req, res) => {
    try {
        let data = await userAPIservice.createNewUser(req.body)
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

const updateFunc = async (req, res) => {
    try {
        let data = await userAPIservice.updateUser(req.body)
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

const deleteFunc = async (req, res) => {
    try {
        await userAPIservice.deleteUser(req.body.id)
        return res.status(200).json({
            EM: 'Delete User success', //error message
            EC: '0', //error code
            DT: '', // Data 
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

const getUserAccount = async (req, res) => {
    return res.status(200).json({
        EM: 'ok',
        EC: 0,
        DT: {
            access_token: req.token,
            groupWithRoles: req.user.groupWithRoles,
            email: req.user.email,
            username: req.user.username
        }
    })
}
module.exports = {
    readFunc, createFunc, updateFunc, deleteFunc, getUserAccount
}