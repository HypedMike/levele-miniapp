'use client'

import {useInitData, WebAppUser} from "@vkruglikov/react-telegram-web-app";
import {useEffect, useState} from "react";

const UserView = () => {

    const [initData] = useInitData()
    const [user, setUser] = useState<WebAppUser>()

    useEffect(() => {
        console.log('initData', initData)
        if (initData) {
            console.log('user', user)
            setUser(initData.user)
        }
    }, [initData]);

    return (
        <div>
            {
                user ? user.first_name : 'Loading...'
            }
        </div>
    )
}

export default UserView