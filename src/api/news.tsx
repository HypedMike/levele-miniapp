import {NewsModel} from "../models/news.ts";
import {API_URL} from "./constants.tsx";

interface NewsInterface {
    getNews: () => Promise<NewsModel[]>;
    sendNews: (title: string, content: string) => Promise<void>;
}

const newsAPI: NewsInterface = {
    getNews: async () => {
        try {
            const res = await fetch(`${API_URL}/news`);
            const json = await res.json();
            return NewsModel.fromJsonToList(json);
        }
        catch (e) {
            console.error(e);
            return [];
        }
    },
    sendNews: async (title: string, content: string) => {
        try {
            await fetch(`${API_URL}/news`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({title, content})
            });
        }
        catch (e) {
            console.error(e);
        }
    }
}

export default newsAPI;