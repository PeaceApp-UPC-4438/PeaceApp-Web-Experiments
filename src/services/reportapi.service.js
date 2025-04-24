import axios from "axios";
import { environment } from "../environments/environment.js";

export class ReportApiService {
    baseUrl = "";

    constructor() {
        this.baseUrl = environment.baseUrl;
    }

    async getAll() {
        let response = null;
        const token = localStorage.getItem('authToken');

        try {
            response = await axios.get(`${this.baseUrl}/reports`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (e) {
            console.error('Error to obtain reports', e);
        }

        return response;
    }

    async create(data) {
        let response = null;
        const token = localStorage.getItem('authToken');

        try {
            response = await axios.post(`${this.baseUrl}/reports`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (e) {
            console.error('Error creating a report', e);
        }

        return response;
    }
}
