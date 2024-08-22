import {NewsModel} from "../models/news.ts";
import {API_URL} from "./constants.tsx";

interface NewsInterface {
    getNews: () => Promise<NewsModel[]>;
}

const newsAPI: NewsInterface = {
    getNews: async () => {
        try {
            const res = await fetch(`${API_URL}/news`, {
                mode: "no-cors",
            });
            const json = await res.json();
            return NewsModel.fromJsonToList(json);
        }
        catch (e) {
            console.error(e);
            return [];
        }
    }
}

export default newsAPI;