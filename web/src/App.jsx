import HeaderBar from "./components/General/HeaderBar"
import { Routes, Route } from "react-router-dom"
import Home from "./views/Home"
import ListChat from "./views/ListChat"
import Login from "./views/Login"
import Profil from "./views/Profil"
import History from "./views/History"
import FooterBar from "./components/General/FooterBar"

function App() {
    return (
        <>
            <div className="app-body">
                <HeaderBar />
                <main>
                    <Routes>
                        <Route path="/" element={ <Home /> } />
                        <Route path='/listChat' element = { <ListChat /> } />
                        <Route path="/login" element={ <Login /> }/>
                        <Route path="/profile/:idUser" element={ <Profil /> }/>
                        <Route path="/history/:idUser" element={ <History /> }/>
                    </Routes>
                </main>
            </div>
            <FooterBar />
        </>
    )   
}

export default App
