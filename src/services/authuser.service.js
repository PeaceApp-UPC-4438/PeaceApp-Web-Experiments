import { environment } from "../environments/environment.js";
import axios from 'axios';

export class authUserService {
    http = null;

    constructor() {
        this.http = axios.create({
            baseURL: environment.baseUrl
        });
    }

    async signInUser(username, password) {
        try {
            const response = await this.http.post('/authentication/sign-in', {
                username,
                password
            });

            // Guarda el token si existe
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
            }

            return response;
        } catch (error) {
            console.error("Login failed", error);
            return error.response;
        }
    }
    async signUp(data) {
        try {
            return await this.http.post('/authentication/sign-up', data);
        } catch (error) {
            console.error("Sign-up failed", error);
            return error.response;
        }
    }

    async getUsers() {
        const token = localStorage.getItem('authToken');
        try {
            return await this.http.get('/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error("Error getting users", error);
            return error.response;
        }
    }
}
