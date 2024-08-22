import {sql} from "@vercel/postgres";

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

    async save () {
        await sql`insert into visitors (ip, useragent, date, page) values (${this.ip}, ${this.userAgent}, ${this.date.toISOString()}, ${this.page})`;
    }
}

export default Visitor;