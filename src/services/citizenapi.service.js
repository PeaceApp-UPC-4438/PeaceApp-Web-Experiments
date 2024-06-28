import axios from "axios";
export class CitizenApiService {
    baseUrl = ""
    constructor() {
        this.baseUrl = "http://localhost:3000"
    }

    async createCitizen(data) {
        let response = null;

        try {
            response = await axios.post(`${this.baseUrl}/citizens`, data);
        }catch(e){
            console.error('Error creating an users', e)
        }
        return response;
    }

    async getCitizenByEmail(email) {
        let response = null;

        try {
            response = await axios.get(`${this.baseUrl}/citizens?email=${email}`);
        } catch(e) {
            console.error('Error getting user by email', e)
        }
        return response;
    }

    async updateCitizen(id, data) {
        let response = null;

        try {
            response = await axios.put(`${this.baseUrl}/citizens/${id}`, data);
        } catch(e) {
            console.error('Error updating user', e)
        }
        return response;
    }
}