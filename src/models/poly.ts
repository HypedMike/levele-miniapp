import { QueryResult, sql } from "@vercel/postgres";

export class PolyRoom {
    entries: PolyRoomEntry[] = [];
    
    static async fromDB(): Promise<PolyRoom> {
        const room = new PolyRoom();

        // query db
        const docs: QueryResult = await sql`SELECT day, hour, id, name, "createdAt" FROM poly_room_entries;`;

        // check if there are no entries
        if (docs.rows.length === 0) {
            return room;
        }

        // create entries
        for (const doc of docs.rows) {
            room.entries.push(PolyRoomEntry.fromJSON(doc));
        }

        return room;
    }

    /**
     * 
     * @returns an array of strings representing the days in the database grouped by day
     */
    getDaysRange() : {
        day: Date,
        hours: boolean[]
    }[] {
        let groups: {
            day: Date,
            hours: boolean[]
        }[] = [];

        const compareDatesDumb = (a: Date, b: Date) => {
            return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
        }

        // create groups
        for (const entry of this.entries) {
            // get the day
            const day = entry.getTimestamp();
            // check if the day is already in the groups
            let found = groups.find(group => {
                return compareDatesDumb(group.day, day);
            });

            if (found) {
                // add the hour to the group
                found.hours[parseInt(entry.hour)] = true;
            } else {
                // create a new group
                let hours: boolean[] = [];
                for (let i = 0; i < 24; i++) {
                    hours.push(false);
                }
                hours[parseInt(entry.hour)] = true;
                groups.push({
                    day: day,
                    hours: hours
                });
            }
        }

        return groups;
    }

    /*
    * Insert a new entry in the database
    */
    static async insertEntry(day: string, hour: string, name?: string): Promise<void> {
        // insert entry
        await sql`INSERT INTO poly_room_entries (name, day, hour) VALUES (${name ?? ""}, ${day}, ${hour});`;
    }

    static async deleteEntry(id: string): Promise<void> {
        // delete entry
        await sql`DELETE FROM poly_room_entries WHERE id = ${id};`;
    }
    
}

export class PolyRoomEntry {
    id?: number;
    day: string;
    hour: string;
    name: string;
    createdAt: Date = new Date();

    constructor(day: string, hour: string, name: string) {
        this.day = day;
        this.hour = hour;
        this.name = name;
    }

    getTimestamp(): Date {
        const split = this.day.split("-");
        return new Date(parseInt(split[0]), parseInt(split[1]) - 1, parseInt(split[2]));
    }

    getItalianTimestamp(): string {
        const d = this.getTimestamp();
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    }

    static fromJSON(json: any): PolyRoomEntry {
        const entry = new PolyRoomEntry(json.day, json.hour, json.name);
        entry.id = json.id;
        entry.createdAt = new Date(json.createdAt);
        return entry;
    }
}