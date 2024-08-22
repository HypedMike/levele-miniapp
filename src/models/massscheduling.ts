import { sql } from "@vercel/postgres";

export class MassScheduling{
    private weekDays: string[] = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì"];
    private massScheduling: string[] = Array(7).fill("");

    constructor(massScheduling: any){
        for(var i = 0; i < massScheduling.length; i++){
            this.massScheduling[i] = massScheduling[i].time;
        };
    }

    static async fetch(): Promise<MassScheduling>{
        const {rows, fields} = await sql`SELECT * FROM massscheduling WHERE date = (SELECT MAX(date) FROM massscheduling)`;

        if(rows.length == 0) {
            return new MassScheduling([]);
        }

        const content = JSON.parse(rows[0].content);

        return new MassScheduling(content.days);
    }
}