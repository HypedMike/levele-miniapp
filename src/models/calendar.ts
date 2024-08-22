import {sql} from "@vercel/postgres";

export class CalendarEvent {
    id?: string
    name: string;
    date: Date;
    description: string;
    admin_id: string;

    constructor(name: string, date: Date, description: string, creatorID: string) {
        this.name = name;
        this.date = date;
        this.description = description;
        this.admin_id = creatorID;
    }

    static async fromDB(next?: boolean): Promise<CalendarEvent[]> {
        if (next) {
            // return only events that are in the future
            const rows = await sql`SELECT * FROM calendar WHERE date >= NOW()`;

            return rows.rows.map((row: any) => {
                const e = new CalendarEvent(row.name, row.date, row.description, row.admin_id);
                e.id = row.id;
                return e;
            });
        }

        const rows = await sql`SELECT * FROM calendar`;
        return rows.rows.map((row: any) => {
            const e = new CalendarEvent(row.name, row.date, row.description, row.admin_id);
            e.id = row.id;
            return e;
        });
    }

    async save(): Promise<void> {
        if(this.id) {
            await sql`UPDATE calendar SET name=${this.name}, date=${this.date.toISOString()}, description=${this.description}, admin_id=${this.admin_id} WHERE id=${this.id}`;
        } else {
            await sql`INSERT INTO calendar (name, date, description, admin_id) VALUES (${this.name}, ${this.date.toISOString()}, ${this.description}, ${this.admin_id})`;
        }
    }

    toJSON(): any {
        return {
            id: this.id,
            name: this.name,
            date: this.date.toISOString(),
            description: this.description,
            admin_id: this.admin_id
        }
    }

    static placeholder(): CalendarEvent {
        return new CalendarEvent("", new Date(), "", "");
    }

    static fromJSON(json: any): CalendarEvent {
        const e = new CalendarEvent(json.name, new Date(json.date), json.description, json.admin_id);
        e.id = json.id;
        return e;
    }
}