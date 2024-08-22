import {NewsModel} from "../../models/news.ts";
import {useEffect, useState} from "react";
import newsAPI from "../../api/news.tsx";
import {NavBar} from "../navbar/navbar.tsx";

export const GetNewsView = () => {
    const [news, setNews] = useState<NewsModel[]>([]);
    const [max, setMax] = useState<number>(3);

    useEffect(() => {
        newsAPI.getNews().then((news) => {
            setNews(news)
        })
    }, []);

    return (
        <div>
            <NavBar />
            {
                news.slice(0, Math.min(
                    news.length,
                    max
                )).map((newsItem) => (
                    <div key={newsItem.id}>
                        <NewsView news={newsItem} />
                    </div>
                ))
            }
            {
                max < news.length ? (
                    <button onClick={() => setMax(max + 3)}>
                        Load more
                    </button>
                ) : null
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