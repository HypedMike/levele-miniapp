import {useInitData, useThemeParams, WebAppUser} from "@vkruglikov/react-telegram-web-app";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export const MainMenu = () => {

    const [initData] = useInitData();
    const theme = useThemeParams();
    const [user, setUser] = useState<WebAppUser>()

    useEffect(() => {
        if(initData){
            setUser(initData.user)
        }
    }, [initData]);

    return (
        <div style={{
            backgroundColor: theme[1] ? theme[1].bg_color : "white",
        }}>
            <div>
                Welcome back {
                    user ? user.first_name : "unknown"
                }!
            </div>
            <div>
                <Link to={"/news"}>
                    Vedi News
                </Link>
                <Link to={"/add_news"}>
                    Aggiungi News
                </Link>
                <Link to={"/orari"}>
                    Orari
                </Link>
            </div>
        </div>
    )
}