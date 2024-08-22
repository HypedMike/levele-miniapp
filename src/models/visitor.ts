
class Visitor {
    ip: string;
    userAgent: string;
    date: Date;
    page: string;

    constructor(ip: string, userAgent: string, date: Date, page: string) {
        this.ip = ip;
        this.userAgent = userAgent;
        this.date = date;
        this.page = page;
    }
}

export default Visitor;