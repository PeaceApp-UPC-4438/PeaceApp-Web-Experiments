import axios from "axios";
import {environment} from "../environments/environment.js";
export class CitizenApiService {
    baseUrl = ""
    constructor() {
        this.baseUrl = environment.baseUrl
    }

    async createCitizen(data) {
        try {
            const token = localStorage.getItem('authToken');
            return await axios.post(`${this.baseUrl}/citizens`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (e) {
            console.error('Error creating a citizen', e);
            return e.response;
        }
    }


    async getCitizenByEmail(email) {
        try {
            const token = localStorage.getItem('authToken');
            return await axios.get(`${this.baseUrl}/citizens?email=${email}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (e) {
            console.error('Error getting user by email', e);
            return e.response;
        }
    }


    async updateCitizen(id, data) {
        try {
            const token = localStorage.getItem('authToken');
            return await axios.put(`${this.baseUrl}/citizens/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (e) {
            console.error('Error updating user', e);
            return e.response;
        }
    }
    async getCitizenById(id) {
        try {
            const token = localStorage.getItem('authToken');
            return await axios.get(`${this.baseUrl}/citizens/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (e) {
            console.error('Error fetching citizen by ID:', e);
            return e.response;
        }
    }
    async deleteCitizen(id) {
        try {
            const token = localStorage.getItem('authToken');
            return await axios.delete(`${this.baseUrl}/citizens/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (e) {
            console.error('Error deleting citizen', e);
            return e.response;
        }
    }


}