import axios from "axios";

const http = axios.create({
    baseURL: "https://6664a80f932baf9032abbc8e.mockapi.io/api",
    headers: {
        "Content-type": "application/json"
    }
})

export default http;