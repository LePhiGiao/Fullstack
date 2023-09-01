
import userAPIservice from '../service/userAPIservice'

const readFunc = async (req, res) => {
    try {
        let data = await userAPIservice.getAllUser()

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

const createFunc = (req, res) => {
    try {

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

const updateFunc = (req, res) => {
    try {

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

const deleteFunc = (req, res) => {
    try {

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
    readFunc, createFunc, updateFunc, deleteFunc
}