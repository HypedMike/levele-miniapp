
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
}