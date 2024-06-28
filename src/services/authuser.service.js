import {environment} from "../environments/environment.js";
import axios from 'axios';
export class authUserService  {

    http = null;
    constructor() {
        this.http = axios.create({
            baseURL: environment.baseUrl
        })
    }

    async getUsers() {
        return await this.http.get('/users');
    }

    async signInUser(email, password) {
        try {
            return await this.http.get('/authentication/sign-in', {
                username: email,
                password: password
            });
        } catch (error) {
            return error.response;
        }
    }
}