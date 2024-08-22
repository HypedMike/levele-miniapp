import {useWebApp} from "@vkruglikov/react-telegram-web-app";

export const MainMenu = () => {

    const webApp = useWebApp();

    return (
        <div>
            <h1>Main Menu</h1>
            <p>Click on the menu items to see the different pages.</p>
            <div>
                {
                    webApp.user ? webApp.user.first_name : "No user"
                }
            </div>
        </div>
    )
}