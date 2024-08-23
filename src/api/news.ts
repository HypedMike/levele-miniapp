import {NewsModel} from "@/models/news";
import {API_URL} from "@/api/constants";

interface NewsInterface {
    getNews(): Promise<NewsModel[]>;
    saveNews(news: NewsModel): Promise<void>;
}

export const News: NewsInterface = {
    async getNews() {
        const fetched = await fetch(`${API_URL}/news`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const res = await fetched.json();

        return NewsModel.fromJsonToList(res);
    },

    async saveNews(news: NewsModel) {
        await fetch(`${API_URL}/news`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(news.toJSON())
        });
    }
}