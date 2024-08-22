import { sql } from "@vercel/postgres";

export class OlympicPlayer {
    playerName: string;
    playerSurname: string;
    playerEmail: string;
    playerPhone: string;
    birth: Date;
    sport: string;
    cf: string;
    parentName: string;
    parentSurname: string;
    parentEmail: string;
    parentPhone: string;
    note: string;
    team: number;

    constructor(playerName: string,
                playerSurname: string,
                playerEmail: string,
                playerPhone: string,
                birth: Date,
                sport: string,
                cf: string,
                parentName: string = '',
                parentSurname: string = '',
                parentEmail: string = '',
                parentPhone: string = '',
                note: string = '',
                team: number = 0) {
        this.playerName = playerName;
        this.playerSurname = playerSurname;
        this.playerEmail = playerEmail;
        this.playerPhone = playerPhone;
        this.birth = birth;
        this.sport = sport;
        this.cf = cf;
        this.parentName = parentName;
        this.parentSurname = parentSurname;
        this.parentEmail = parentEmail;
        this.parentPhone = parentPhone;
        this.note = note;
        this.team = team;
    }

    isMinor(): boolean {
        const now = new Date();
        const age = now.getFullYear() - this.birth.getFullYear();
        if (now.getMonth() < this.birth.getMonth() || (now.getMonth() === this.birth.getMonth() && now.getDate() < this.birth.getDate())) {
            return age - 1 < 18;
        }
        return age < 18;
    }

    toObject(): any {

        console.log(this.note)

        return {
            playerName: this.playerName,
            playerSurname: this.playerSurname,
            playerEmail: this.playerEmail,
            playerPhone: this.playerPhone,
            birth: this.birth,
            sport: this.sport,
            cf: this.cf,
            parentName: this.parentName,
            parentSurname: this.parentSurname,
            parentEmail: this.parentEmail,
            parentPhone: this.parentPhone,
            note: this.note,
            team: this.team
        };
    }

    static fromRow(row: any): OlympicPlayer {
        return new OlympicPlayer(
            row.playerName,
            row.playerSurname,
            row.playerEmail,
            row.playerPhone,
            new Date(row.birth),
            row.sport,
            row.cf,
            row.parentName,
            row.parentSurname,
            row.parentEmail,
            row.parentPhone,
            row.note,
            row.team
        );
    }

    static fromJSON(row: any): OlympicPlayer {
        return new OlympicPlayer(
            row.playername,
            row.playersurname,
            row.playeremail,
            row.playerphone,
            new Date(row.birth),
            row.sport,
            row.cf,
            row.parentname,
            row.parentsurname,
            row.parentemail,
            row.parentphone,
            row.note,
            row.team
        );
    }

    static async getAll(): Promise<OlympicPlayer[]> {
        const rows = await sql`SELECT * FROM players_olimpiadi`;

        return rows.rows.map((row: any) => {
            return OlympicPlayer.fromJSON(row);
        });
    }

}

export class OlympicGame {
    name: string;
    date: Date;
    points: number;
    team: string;

    constructor(name: string, date: Date, points: number, team: string) {
        this.name = name;
        this.date = date;
        this.points = points;
        this.team = team;
    }

    toObject(): any {
        return {
            name: this.name,
            date: this.date,
            points: this.points,
            team: this.team
        };
    }

    static fromRow(row: any): OlympicGame {
        return new OlympicGame(
            row.name,
            new Date(row.date),
            row.points,
            row.team
        );
    }

    static fromJSON(row: any): OlympicGame {
        return new OlympicGame(
            row.name,
            new Date(row.date),
            row.points,
            row.team
        );
    }

    static fromArray(rows: any[]): OlympicGame[] {
        return rows.map((row: any) => {
            return OlympicGame.fromJSON(row);
        });
    }

    static async getAll(): Promise<OlympicGame[]> {
        const rows = await sql`SELECT * FROM games_olimpiadi`;

        return OlympicGame.fromArray(rows.rows);
    }
}