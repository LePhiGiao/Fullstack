
import db from '../models/index'

const getAllGroups = async (req, res) => {
    try {
        let data = await db.Group.findAll({
            order: [['name', 'ASC']]
        })
        return {
            EM: 'Get all group success',
            EC: 0,
            DT: data
        }
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
    getAllGroups
}