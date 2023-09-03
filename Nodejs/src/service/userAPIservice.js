
import db from '../models/index'
import { checkEmailExist, checkPhoneExist, hashUserPassword } from '../service/loginRegisterService'

const getAllUser = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "sex"],
            include: { model: db.Group, attributes: ["name", "description"] },
        })
        if (users) {
            return {
                EM: 'Get data success',
                EC: 0,
                DT: users
            }
        }
        else {
            return {
                EM: 'Get data success',
                EC: 0,
                DT: []
            }
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

const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit
        let { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["id", "username", "email", "phone", "address", "sex"],
            include: { model: db.Group, attributes: ["name", "description", "id"] },
            order: [['id', 'DESC']],     //Tăng dần: ASC, giảm dần DESC
        })

        let totalPage = Math.ceil(count / limit)

        let data = {
            totalRows: count,       //Tổng số phần tử trong db
            totalPage: totalPage,
            users: rows             //Số phần tử được lấy ra tương ứng với Page ở dạng object
        }

        return {
            EM: 'success',
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

const createNewUser = async (data) => {
    try {
        //check email, phone
        let isEmailExist = await checkEmailExist(data.email)
        if (isEmailExist) {
            return {
                EM: 'The email is already exist',
                EC: '1',
                DT: 'email'
            }
        }
        let isPhoneExist = await checkPhoneExist(data.phone)
        if (isPhoneExist) {
            return {
                EM: 'The phone is already exist',
                EC: '1',
                DT: 'phone'
            }
        }

        //hash password
        let hashPassword = hashUserPassword(data.password)

        //create user
        await db.User.create({ ...data, password: hashPassword })
        return {
            EM: 'create success',
            EC: 0,
            DT: []
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

const updateUser = async (data) => {
    try {
        let user = await db.User.findOne({
            where: { id: data.id }
        })
        if (user) {
            user.save({

            })
        }
        else {

        }
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: { id: id }
        })
        if (user) {
            await user.destroy();
            return {
                EM: 'Delete User Success',
                EC: 0,
                DT: [],
            }
        }

        else {
            return {
                EM: 'User not exist',
                EC: 2,
                DT: []
            }
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
    getAllUser, createNewUser, updateUser, deleteUser, getUserWithPagination
}