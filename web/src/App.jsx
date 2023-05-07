import HeaderBar from "./components/General/HeaderBar"
import { Routes, Route } from "react-router-dom"
import Home from "./views/Home"
import Login from "./views/Login"
import Profil from "./views/Profil"
import History from "./views/History"
import FooterBar from "./components/General/FooterBar"
import Chat from "./views/Chat"
import SideBar from "./components/General/SideBar";
import { setupSocket, socket } from "./Socket/socket.ts";
import BannerAlert from "./components/General/BannerAlert"
import NotFound from "./views/NotFound"
import CreateAnnounce from "./views/CreateAnnounce"
import { useState } from "react"

function App() {
    const [keyBannerAlert, setKeyBannerAlert] = useState(0);
    
    setupSocket();    

    socket.on("newMessage", (message) => {
        setKeyBannerAlert(keyBannerAlert + 1);
        console.log(message)
    });

    return (
        <>
            {!!keyBannerAlert && <BannerAlert 
                duration={2} 
                information="Ceci est un test" 
                key={keyBannerAlert}
            />}
            <div className="app-body">
                <HeaderBar />
                <SideBar />
                <main>
                    <Routes>
                        <Route path="/" element={ <Home /> } />
                        <Route path='/chat/:chatId' element = { <Chat /> } />
                        <Route path="/login" element={ <Login /> }/>
                        <Route path="/profile/:userName" element={<Profil />} />
                        <Route path="/history/:idHistory" element={ <History /> } />
                        <Route path="/createAnnounce" element={ <CreateAnnounce /> }></Route>
                        <Route path="*" element={ <NotFound /> } />
                    </Routes>
                </main>
            </div>
            <FooterBar />
        </>
    )   
}

export default App
