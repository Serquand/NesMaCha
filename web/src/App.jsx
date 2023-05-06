import HeaderBar from "./components/General/HeaderBar"
import { Routes, Route } from "react-router-dom"
import Home from "./views/Home"
import Login from "./views/Login"
import Profil from "./views/Profil"
import History from "./views/History"
import FooterBar from "./components/General/FooterBar"
import Chat from "./views/Chat"
import SideBar from "./components/General/SideBar";
import { setupSocket } from "./Socket/Socket"
import BannerAlert from "./components/General/BannerAlert"
import NotFound from "./views/NotFound"

function App() {
    setupSocket();
    
    return (
        <>
            <div className="app-body">
                <HeaderBar />
                <SideBar />
                {/* <BannerAlert duration={2} information="Ceci est un test" /> */}
                <main>
                    <Routes>
                        <Route path="/" element={ <Home /> } />
                        <Route path='/chat/:chatId' element = { <Chat /> } />
                        <Route path="/login" element={ <Login /> }/>
                        <Route path="/profile/:userName" element={<Profil />} />
                        <Route path="/history/:userName" element={ <History /> }/>
                        <Route path="*" element={ <NotFound /> } />
                    </Routes>
                </main>
            </div>
            <FooterBar />
        </>
    )   
}

export default App
