import axios from "axios";
export class ReportApiService {
    baseUrl = ""
    constructor() {
        this.baseUrl = "http://localhost:3000"
    }
    async getAll() {
        let response = null;

        try {
            response = await axios.get(`${this.baseUrl}/reports`)
        } catch(e) {
            console.error('Error to obtain reports', e)
        }

        return response;
    }

   async create(data) {
        let response = null;

        try {
            response = await axios.post(`${this.baseUrl}/reports`, data);
        } catch(e){
            console.error('Error creating an report', e)
        }
        return response;
    }

}