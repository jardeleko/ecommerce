import axios from "axios";

const BASE_URL = "http://localhost:3030/api"
const TK = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzA1MDE3YzQ3MmEwMTMxNzhhNDc1MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MjIzMTc3MSwiZXhwIjoxNjUyNDkwOTcxfQ.cnpDNke7vZOBm99qDJGseXFkRF0nrXVZiGMRy-iMNiM"

const userRequest = axios.create({
    baseURL:BASE_URL,
    headers:{token:`Bearer ${TK}`}
})

export default userRequest;
