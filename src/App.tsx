import './App.css'
import {MainMenu} from "./components/main_menu/main.tsx";
import {HashRouter, Route, Routes} from "react-router-dom";
import {GetNewsView} from "./components/news/main.tsx";
import {AddNewsView} from "./components/news/add_news.tsx";

function App() {
    return (
    <>
        <HashRouter basename={"/"}>
            <Routes>
                <Route path="/" element={<MainMenu />} />
                <Route path="/news" element={<GetNewsView />} />
                <Route path="/send_news" element={<AddNewsView />} />
            </Routes>
        </HashRouter>
    </>
  )
}

export default App
