import mysql from 'mysql2'

//connect to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt'
});

const handleHelloWorld = (req, res) => {
    return res.render('home.ejs')
}

const handleUserPage = (req, res) => {
    return res.render('user.ejs')
}
const handleCreateNewUser = (req, res) => {
    let { email, password, username } = req.body
    connection.query(
        'INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, password, username],
        function (err, results, fields) {
            console.log(results);
        }
    );

    return res.send('Hello Create Usser')
}

module.exports = {
    handleHelloWorld, handleUserPage, handleCreateNewUser
}