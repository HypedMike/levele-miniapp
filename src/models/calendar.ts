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