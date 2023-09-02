
import groupService from '../service/groupService'

const readFunc = async (req, res) => {
    try {
        let data = await groupService.getAllGroups()
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT, // Data
        })
    } catch (error) {
        console.log(error)
        return {
            EM: 'Something wrong with service',
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    readFunc
}