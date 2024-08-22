type NewsLink = {
    title: string;
    url: string;
}

export class NewsModel {
    id: number;
    title: string;
    content: string;
    img?: string;
    date: Date;

    creator?: string;

    links: NewsLink[] = [];

    constructor(id: number, title: string, content: string,links: NewsLink[], date: Date, img?: string, creator?: string) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.img = img;
        this.date = date;
        this.links = links;
        this.creator = creator;
    }

    /*
    * Convert a JSON object to News object
    * @param json: typically a JSON obtained from an API response
    * @return News
    */
    static fromJson(json: any): NewsModel {
        return new NewsModel(json.id, json.title, json.content, json.links, new Date(json.date), json.img, json.creator);
    }

    static fromArray(json: any[]): NewsModel[] {
        if (!json) {
            return [];
        }
        return json.map(NewsModel.fromJson);
    }

    /**
     * 
     * @param json an array of json objects
     * @returns an array of News objects
     */
    static fromJsonToList(json: any[]): NewsModel[] {
        if (!json) {
            return [];
        }
        return json.map(NewsModel.fromJson);
    }
}