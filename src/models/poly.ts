export class PolyRoom {
    entries: PolyRoomEntry[] = [];

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