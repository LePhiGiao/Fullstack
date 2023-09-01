import axios from "axios"


const registerNewUser = (userData) => {
    return axios.post('http://localhost:8081/api/v1/register', userData)
}

const loginUser = (valueLogin, password) => {
    return axios.post('http://localhost:8081/api/v1/login', {
        valueLogin, password
    })
}

const fetchAllUsers = (page, limit) => {
    return axios.get(`http://localhost:8081/api/v1/user/read?page=${page}&limit=${limit}`)
}


export { registerNewUser, loginUser, fetchAllUsers }