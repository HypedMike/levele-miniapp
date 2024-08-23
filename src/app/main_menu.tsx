'use client'

import styles from "./page.module.css";

const MainMenu = () => {
    const buttons: {
        text: string,
        link: string,
        icon: string
    }[] = [
        {
            text: 'Home',
            link: '/',
            icon: 'home'
        },
        {
            text: 'About',
            link: '/about',
            icon: 'info'
        },
        {
            text: 'Contact',
            link: '/contact',
            icon: 'mail'
        },
        {
            text: 'Login',
            link: '/login',
            icon: 'login'
        },
        {
            text: 'Register',
            link: '/register',
            icon: 'person_add'
        },
        {
            text: 'Logout',
            link: '/logout',
            icon: 'logout'
        }
    ]

    return (
        <div>
            <div className={styles.main_menu}>
                {
                    buttons.map((button, index) => {
                        return (
                            <button className={styles.menu_item} key={index} onClick={
                                () => {
                                    window.location.href = button.link
                                }
                            }>
                                {button.text}
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MainMenu