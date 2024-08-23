import styles from "./page.module.css";
import UserView from "@/components/user_view/user_view";
import MainMenu from "@/app/main_menu";

export default function Home() {

  return (
    <main className={styles.main}>
        <header className={styles.header}>
            <h1>
                San Donato
                <p>
                    ToolKit
                </p>
            </h1>
            <UserView />
            <MainMenu />
        </header>
    </main>
  );
}
