import "../../styles/css/index.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import appInformations from "../../../informations.json";
import ListSelectChat from "../Chat/ListSelectChat";
import SelectAnnounce from "../Announce/SelectAnnounce";
import CreateChat from "../Chat/CreateChat";

const SideBar = () => {
    const { menuVisible } = useSelector(state => state.displayer)
    const [informations, setInformations] = useState([]);
    const { category } = useSelector(state => state.displayer)

    const [createChat, setCreateChat] = useState(false);
    const [createAnnounce, setCreateAnnounce] = useState(false);

    const endpoints = {
        Chat: "/chat/list/1", 
        Annonces: "/chat/list/1", 
        Demandes: "/chat/list/1",
        Historiques: "/chat/list/1"
    }

    useEffect(() => {
        const fetcher = async () => {
            const res = await fetch(appInformations.urlAPI + endpoints[category]);
            const data = await res.json();
            setInformations(data.list);
        }
        
        fetcher();
    }, [category])

    return (
        <div>
            <section className={`sidebar ${(menuVisible ? 'sidebar-toggled' : '')}`}>
                {category == "Chat" && <ListSelectChat 
                    informations={informations} 
                    startCreation={() => setCreateChat(true)}
                    endCreation={() => setCreateChat(false)}
                />}

                {category == "Annonces" && <SelectAnnounce 
                    listAnnounce={informations}
                />}
            </section>

            {createChat && <CreateChat endCreation={() => setCreateChat(false)} />}
        </div>
    )
} 

export default SideBar;