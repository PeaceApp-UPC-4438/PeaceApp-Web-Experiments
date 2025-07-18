import axios from "axios";
import { environment } from "../environments/environment.js";

export class ReportApiService {
    constructor() {
        this.baseUrl = environment.baseUrl;
    }

    getAuthHeaders() {
        const token = localStorage.getItem("authToken");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }

    // Obtener todos los reportes
    async getAll() {
        try {
            return await axios.get(`${this.baseUrl}/reports/`, {
                headers: this.getAuthHeaders()
            });
        } catch (error) {
            console.error("Error fetching all reports", error);
            return error.response;
        }
    }

    // Obtener reportes por usuario
    async getByUserId(userId) {
        try {
            return await axios.get(`${this.baseUrl}/reports/user/${userId}`, {
                headers: this.getAuthHeaders()
            });
        } catch (error) {
            console.error("Error fetching reports by user ID", error);
            return error.response;
        }
    }

    // Obtener un solo reporte por ID
    async getById(id) {
        try {
            return await axios.get(`${this.baseUrl}/reports/${id}`, {
                headers: this.getAuthHeaders()
            });
        } catch (error) {
            console.error("Error fetching report by ID", error);
            return error.response;
        }
    }

    // Crear reporte
    async create(data) {
        try {
            return await axios.post(`${this.baseUrl}/reports/`, data, {
                headers: this.getAuthHeaders()
            });
        } catch (error) {
            console.error("Error creating report", error);
            return error.response;
        }
    }
}
