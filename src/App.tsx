import './App.css'
import {MainMenu} from "./components/main_menu/main.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {GetNewsView} from "./components/news/main.tsx";

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainMenu />
        },
        {
            path: "/news",
            element: <GetNewsView />
        }
    ])

  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App
