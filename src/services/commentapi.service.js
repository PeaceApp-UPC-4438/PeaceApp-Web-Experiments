import axios from "axios";
import { environment } from "../environments/environment.js";

export class CommentApiService {
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

    // Crear un nuevo comentario
    async createComment(data) {
        try {
            return await axios.post(`${this.baseUrl}/comments/`, data, {
                headers: this.getAuthHeaders()
            });
        } catch (error) {
            console.error("Error creating comment", error);
            return error.response;
        }
    }

    // Obtener comentarios por reportId
    async getCommentsByReportId(reportId) {
        try {
            return await axios.get(`${this.baseUrl}/comments/report/${reportId}`, {
                headers: this.getAuthHeaders()
            });
        } catch (error) {
            console.error("Error fetching comments", error);
            return error.response;
        }
    }

    // Actualizar comentario
    async updateComment(id, content) {
        try {
            return await axios.put(`${this.baseUrl}/comments/${id}`, { content }, {
                headers: this.getAuthHeaders()
            });
        } catch (error) {
            console.error("Error updating comment", error);
            return error.response;
        }
    }

    // Eliminar comentario
    async deleteComment(id) {
        try {
            return await axios.delete(`${this.baseUrl}/comments/${id}`, {
                headers: this.getAuthHeaders()
            });
        } catch (error) {
            console.error("Error deleting comment", error);
            return error.response;
        }
    }
}
