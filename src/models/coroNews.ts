import { sql } from "@vercel/postgres";

export class CoroNews {
    id?: number;
    date: Date;
    title: string;
    content: string;

    constructor(title: string, content: string, date: Date) {
        this.date = date;
        this.title = title;
        this.content = content;
    }

    setId(id: number) {
        this.id = id;
    }

    getId(): number {
        return this.id ?? -1;
    }

    async upload(): Promise<boolean> {
        const res = await sql`INSERT INTO coro_news (title, content, date) VALUES (${this.title}, ${this.content}, ${this.date.toISOString()})`;
        return res.rowCount === 1;
    }

    static fromRow(row: any): CoroNews {
        const coroNews = new CoroNews(row.title, row.content, new Date(row.date));
        coroNews.setId(row.id);
        return coroNews;
    }

    static fromJson(json: any): CoroNews {
        const coroNews = new CoroNews(json.title, json.content, new Date(json.date));
        coroNews.setId(json.id);
        return coroNews;
    }

    static async fetchAll(): Promise<CoroNews[]> {
        const res = await sql`select * from coro_news`;
        return res.rows.map(row => CoroNews.fromRow(row));
    }

    static async fetch(id: number): Promise<CoroNews | null> {
        const res = await sql`SELECT * FROM coro_news WHERE id = ${id}`;
        if (res.rowCount === 0) {
            return null;
        }
        const row = res.rows[0];
        return CoroNews.fromRow(row);
    }

    async update(title: string, content: string): Promise<boolean> {
        const res = await sql`UPDATE coro_news SET title = ${title}, content = ${content} WHERE date = ${this.date.toISOString()}`;
        return res.rowCount === 1;
    }

    async delete(): Promise<boolean> {
        const res = await sql`DELETE FROM coro_news WHERE id = ${this.id}`;
        return res.rowCount === 1;
    }
}