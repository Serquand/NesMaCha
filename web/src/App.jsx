import { Routes, Route } from "react-router-dom"
import Home from "./views/Home"
import LogIn from "./views/LoginPage.jsx"
import Profil from "./views/Profil"
import History from "./views/History"
import Chat from "./views/Chat"
import NotFound from "./views/NotFound"
import Announce from "./views/Announce";
import AnnounceView from "./views/AnnounceView"

import HeaderBar from "./components/General/HeaderBar"
import FooterBar from "./components/General/FooterBar"
import SideBar from "./components/General/SideBar";
import BannerAlert from "./components/General/BannerAlert"

import { useSelector } from "react-redux";


function App() {
    const { userToken } = useSelector(state => state.user);

    return (
        <>
            {userToken && <BannerAlert duration={2} />}
            <div className="app-body">
                <HeaderBar />
                {userToken && <SideBar />}
                <main>
                    <Routes>
                        <Route path="/" element={ <LogIn /> } />
                        <Route path='/chat/:chatId' element = { <Chat /> } />
                        <Route path="/home" element={ <Home /> }/>
                        <Route path="/profile" element={<Profil />} />
                        <Route path="/history/:idHistory" element={ <History /> } />
                        <Route path="/announce" element={ <Announce /> }></Route>
                        <Route path="/announce/:idAnnounce" element={<AnnounceView />}></Route>
                        <Route path="*" element={ <NotFound /> } />
                    </Routes>
                </main>
            </div>

            <FooterBar />
        </>
    )   
}

export default App
