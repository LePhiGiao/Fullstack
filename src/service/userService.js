import bcrypt, { hash } from 'bcrypt'
import mysql from 'mysql2/promise'
import bluebird from 'bluebird'

//connect to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'jwt'
// });


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
const createNewUser = (email, password, username) => {
    let hashPass = hashUserPassword(password)
    //insert Data
    connection.query(
        'INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, hashPass, username],
        function (err, results, fields) {
            console.log(results);
        }
    );
}

//get list user
const getUserList = async () => {
    let users = []
    // connection.query(
    //     'SELECT * FROM users ',
    //     function (err, results, fields) {
    //         if (err) {
    //             console.log(err)
    //             return users
    //         }
    //         users = results
    //         return users
    //     }
    // );
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    const [rows, fields] = await connection.execute('SELECT * FROM users');
    return rows
}

module.exports = {
    hashUserPassword, createNewUser, getUserList
}