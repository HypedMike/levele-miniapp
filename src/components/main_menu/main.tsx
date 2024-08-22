import {useInitData, WebAppUser} from "@vkruglikov/react-telegram-web-app";
import {useEffect, useState} from "react";

export const MainMenu = () => {

    const [initData] = useInitData();
    const [user, setUser] = useState<WebAppUser>()

    useEffect(() => {
        if(initData){
            setUser(initData.user)
        }
    }, [initData]);

    return (
        <div>
            <h1>Main Menu</h1>
            <p>Click on the menu items to see the different pages.</p>
            <div>
                {
                    user ? user.first_name : "unknown"
                }
            </div>
        </div>
    )
}