import style from "./navbar.module.css";

export const NavBar = () => {
    return (
        <nav className={style.nav}>
            <div>
                <button onClick={
                    () => window.history.back()
                }>Back</button>
            </div>
            <div>
                <button onClick={
                    () => window.history.forward()
                }>Forward</button>
            </div>
        </nav>
    )
}