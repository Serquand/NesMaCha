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

function App() {
    setupSocket();
    
    return (
        <>
            <div className="app-body">
                <HeaderBar />
                <SideBar />
                <BannerAlert 
                    duration={1} 
                    information="Ceci est un test" 
                />
                <main>
                    <Routes>
                        <Route path="/" element={ <Home /> } />
                        <Route path='/chat/:chatId' element = { <Chat /> } />
                        <Route path="/login" element={ <Login /> }/>
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
