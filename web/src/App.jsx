import { Routes, Route } from "react-router-dom"
import { setupSocket } from "./Socket/Socket"

import Home from "./views/Home"
import Default from "./views/DefaultPage"
import Profil from "./views/Profil"
import History from "./views/History"
import Chat from "./views/Chat"

import HeaderBar from "./components/General/HeaderBar"
import FooterBar from "./components/General/FooterBar"
import SideBar from "./components/General/SideBar";


function App() {
    setupSocket();
    
    return (
        <>
            <div className="app-body">
                <HeaderBar />

                <SideBar />

                <main>
                    <Routes>
                        <Route path="/" element={ <Home /> } />
                        <Route path='/chat/:chatId' element = { <Chat /> } />
                        <Route path="/hello" element={ <Default /> }/>
                        <Route path="/profile" element={<Profil />} />
                        <Route path="/history/:userName" element={ <History /> }/>
                    </Routes>
                </main>
            </div>

            <FooterBar />
        </>
    )   
}

export default App
