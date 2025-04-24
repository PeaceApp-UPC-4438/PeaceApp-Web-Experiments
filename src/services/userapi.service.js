import axios from "axios";
import { environment } from "../environments/environment.js";

export class UserApiService {
    baseUrl = "";

    constructor() {
        this.baseUrl = environment.baseUrl;
    }

    async getAllUsers() {
        try {
            const token = localStorage.getItem('authToken');
            return await axios.get(`${this.baseUrl}/users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (e) {
            console.error('Error to obtain users', e);
            return e.response;
        }
    }

    async createUser(data) {
        try {
            const token = localStorage.getItem('authToken');
            return await axios.post(`${this.baseUrl}/users`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (e) {
            console.error('Error creating a user', e);
            return e.response;
        }
    }

}
