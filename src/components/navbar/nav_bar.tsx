'use client'
import style from './navbar.module.css'

const NavBar = () => {
    return (
        <nav className={style.nav}>
            <button onClick={
                () => {
                    window.location.href = '/'
                }
            }>
                Go back
            </button>
            <div>
                Logo
            </div>
        </nav>
    )
}

export default NavBar