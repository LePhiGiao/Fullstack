import bcrypt from 'bcrypt'
import db from '../models/index'



//hash password
const hashUserPassword = (userPassword) => {
    const saltRounds = 10;
    const myPlaintextPassword = userPassword;

    //sync
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(myPlaintextPassword, salt);
    return hashPassword

    //async
    // bcrypt.genSalt(saltRounds, function (err, salt) {
    //     bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
    //         console.log(hash)
    //         bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
    //             console.log(result)
    //         });
    //     });
    // });
}

//create User
const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password)
    try {
        await db.User.create({
            email: email,
            password: hashPass,
            username: username
        })
    }
    catch (error) {
        console.log(error)
    }
}

//get list user
const getUserList = async () => {

    //test relationship
    let newUser = await db.User.findOne({
        where: { id: 1 },
        attributes: ["id", "username"],
        include: { model: db.Group, attributes: ["name", "description"] },
        raw: true,
        nest: true

    })
    let roles = await db.Role.findAll({
        include: { model: db.Group, where: { id: 1 } },
        raw: true,
        nest: true
    })


    let users = []
    users = await db.User.findAll()

    return users
}

//delele user
const deleteUser = async (userId) => {
    await db.User.destroy({
        where: {
            id: userId
        }
    })

}

// get User by ID
const getUserById = async (userId) => {
    let user = {}
    user = await db.User.findOne({ where: { id: userId } })

    return user
}

// update user
const updateUserInfo = async (email, username, id) => {
    await db.User.update({
        email: email,
        username: username
    }, {
        where: {
            id: id
        }
    })
}

module.exports = {
    hashUserPassword, createNewUser, getUserList, deleteUser, getUserById, updateUserInfo
}