import styles from "./news.module.css";
import { News as NewsApi } from "@/api/news";
import {CreateNewsComp} from "@/app/news/create_news_comp";

export default async function News() {

    const news = await NewsApi.getNews();

    return (
        <main className={styles.main}>
            <CreateNewsComp />
            {
                Array.isArray(news) ? news.map((n, i) => {
                    return (
                        <div key={i} className={styles.news}>
                            <h2>{n.title}</h2>
                            <p>{n.content}</p>
                        </div>
                    )
                }) : <div className={styles.news}>
                    <h2>News not found</h2>
                </div>
            }
        </main>
    );
}