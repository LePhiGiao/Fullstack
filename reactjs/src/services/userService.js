import axios from "axios"


const registerNewUser = (userData) => {
    return axios.post('http://localhost:8081/api/v1/register', userData)
}

export { registerNewUser }