import bcrypt, { hash } from 'bcrypt'
import mysql from 'mysql2/promise'
import bluebird from 'bluebird'
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
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    const [rows, fields] = await connection.execute('SELECT * FROM user');
    return rows
}

//delele user
const deleteUser = async (id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    const [rows, fields] = await connection.execute('DELETE FROM user WHERE id=?', [id]);
}

// get User by ID
const getUserById = async (id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    const [rows, fields] = await connection.execute('SELECT * FROM user WHERE id=?', [id])
    return rows
}

// update user
const updateUserInfo = async (email, username, id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    const [rows, fields] = await connection.execute('UPDATE user SET email=?, username=? WHERE id=?', [email, username, id])
}

module.exports = {
    hashUserPassword, createNewUser, getUserList, deleteUser, getUserById, updateUserInfo
}