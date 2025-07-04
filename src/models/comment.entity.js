export class Comment {
    constructor(reportId = 0, userId = "", content = "") {
        this.reportId = reportId;
        this.userId = userId;
        this.content = content;
    }
}
