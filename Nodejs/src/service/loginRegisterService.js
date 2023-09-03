import db from '../models/index'
import bcrypt from 'bcrypt'
import { Op } from 'sequelize'


const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })
    if (user) {
        return true
    }
    return false
}

const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone }
    })
    if (user) {
        return true
    }
    return false
}

const hashUserPassword = (userPassword) => {
    const saltRounds = 10;
    const myPlaintextPassword = userPassword;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(myPlaintextPassword, salt);
    return hashPassword
}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword)
}

const registerNewUser = async (rawUserData) => {
    try {
        //1. check email or phone is exist on Database ?
        let isEmailExist = await checkEmailExist(rawUserData.email)
        if (isEmailExist) {
            return {
                EM: 'The email is already exist',
                EC: '1'
            }
        }
        let isPhoneExist = await checkPhoneExist(rawUserData.phone)
        if (isPhoneExist) {
            return {
                EM: 'The phone is already exist',
                EC: '1'
            }
        }

        //2. hash user password
        let hashPassword = hashUserPassword(rawUserData.password)

        //3. create User
        await db.User.create({
            email: rawUserData.email,
            phone: rawUserData.phone,
            username: rawUserData.username,
            password: hashPassword,
        })

        return {
            EM: 'Created user successfully',
            EC: '0'
        }

    }
    catch (e) {
        console.log(e)
        return {
            EM: 'Something is wrong',
            EC: '-1'
        }
    }
}

const handleUserLogin = async (rawData) => {
    try {
        //1. check user is exist on Database ?
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin }
                ]
            }
        })
        if (user) {
            console.log('>>>> Found user')
            let isCorrectPassword = checkPassword(rawData.password, user.password)
            if (isCorrectPassword) {
                return {
                    EM: 'OK',
                    EC: '0',
                    DT: ''
                }
            }
        }
        console.log('>>> Not found user Email or phone', rawData.valueLogin, 'Password', rawData.password)
        return {
            EM: 'Your Email, phone or your password is incorrect',
            EC: '1',
            DT: ''
        }
    }
    catch (e) {
        console.log(e)
        return {
            EM: 'Something is wrong',
            EC: '-1',
            DT: ''
        }
    }
}

module.exports = {
    registerNewUser, handleUserLogin, checkEmailExist, checkPhoneExist, hashUserPassword
}