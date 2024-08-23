'use client'

import styles from "./page.module.css";

const MainMenu = () => {
    const buttons: {
        text: string,
        link: string,
        icon: string
    }[] = [
        {
            text: 'Orari',
            link: '/orari',
            icon: 'info'
        },
        {
            text: 'News',
            link: '/news',
            icon: 'mail'
        },
        {
            text: 'Catechismo',
            link: '/login',
            icon: 'login'
        },
        {
            text: 'Calendario',
            link: '/calendario',
            icon: 'person_add'
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