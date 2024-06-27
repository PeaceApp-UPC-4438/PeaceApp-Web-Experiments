import axios from "axios";
export class UserApiService {
    baseUrl = ""
    constructor() {
        this.baseUrl = "http://localhost:3000"
    }
    async getAllUsers() {
        let response = null;

        try {
            response = await axios.get(`${this.baseUrl}/users`)
        }catch(e) {
            console.error('Error to obtain users', e)
        }

        return response;
    }

    async createUser(data) {
        let response = null;

        try {
            response = await axios.post(`${this.baseUrl}/users`, data);
        }catch(e){
            console.error('Error creating an users', e)
        }
        return response;
    }

    async getUserByEmailAndPassword(email, password) {
        let response = null;
        try {
            response = await axios.get(`${this.baseUrl}/users?email=${email}&password=${password}`);
        }catch(e) {
            console.error('Error to obtain the user', e);
        }
        return response;
    }
}