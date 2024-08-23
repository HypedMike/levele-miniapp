'use client'

import {useState} from "react";
import {NewsModel} from "@/models/news";
import {News} from "@/api/news";
import style from "./news.module.css";
import NavBar from "@/components/navbar/nav_bar";

export const CreateNewsComp = () => {
    const [show, setShow] = useState(false);
    const [news, setNews] = useState(NewsModel.placeholder().toJSON());
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNews({
            ...news,
            [e.target.name]: e.target.value
        });
    }

    const saveNews = async () => {
        setLoading(true);
        const n = NewsModel.fromJson(news);
        await News.saveNews(n);
        setNews(NewsModel.placeholder().toJSON());
        setLoading(false);
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "90%",
        }}>
            <NavBar />
            {
                !show ? <button className={style.openButton} onClick={() => setShow(true)}>Create news</button> :
                    <div  className={style.form}>
                        <input placeholder={"Titolo"} type="text" name="title" value={news.title} onChange={handleChange} />
                        <textarea placeholder={"Contenuto"} name="content" value={news.content} onChange={handleChange} />
                        {
                            loading ? <div>Loading...</div> : <button onClick={saveNews}>Save</button>
                        }
                        <button onClick={() => setShow(false)}>Close</button>
                    </div>
            }
        </div>
    )
}