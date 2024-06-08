import httpCommon from "../../../shared/services/http-common.js";

export class ReportApiService {
    getAll() {
        return httpCommon.get("/reports");
    }

    get(id) {
        return httpCommon.get(`/reports/${id}`);
    }

    create(data) {
        return httpCommon.post("/reports", JSON.stringify(data));
    }

}