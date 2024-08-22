import {NewsModel} from "../../models/news.ts";
import {useEffect, useState} from "react";
import newsAPI from "../../api/news.tsx";

export const GetNewsView = () => {
    const [news, setNews] = useState<NewsModel[]>([]);

    useEffect(() => {
        newsAPI.getNews().then((news) => {
            setNews(news)
        })
    }, []);

    return (
        <div>
            {
                news.map((newsItem) => (
                    <div key={newsItem.id}>
                        <NewsView news={newsItem} />
                    </div>
                ))
            }
        </div>
    )
}

const NewsView = (props: {
    news: NewsModel
}) => {

    const news = props.news;

    return (
        <div>
            <h3>
                {news.title}
            </h3>
            <p>
                {news.content}
            </p>
        </div>
    )
}