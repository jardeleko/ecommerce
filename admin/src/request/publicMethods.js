import axios from "axios"

const BASE_URL = "http://localhost:3030/api"

const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export default publicRequest

