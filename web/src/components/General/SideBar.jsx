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
    const { category } = useSelector(state => state.displayer);
    const { userName } = useSelector(state => state.user);

    const [createChat, setCreateChat] = useState(false);

    const endpoints = {
        Chat: "/chat/list", 
        Annonces: "/chat/list", 
        Demandes: "/chat/list",
        Historiques: "/chat/list"
    }

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(appInformations.urlAPI + endpoints[category] + "/" + userName);
                const data = await res.json();
                setInformations(data.list);
            } catch {
                setInformations([]);
            }
        })();
    }, [category, userName])

    return (
        <div>
            <section className={`sidebar ${(menuVisible ? 'sidebar-toggled' : '')}`}>
                {category == "Chat" && <ListSelectChat 
                    informations={informations} 
                    startCreation={() => setCreateChat(true)}
                />}
                {category == "Annonces" && <SelectAnnounce listAnnounce={informations} />}
            </section>
            {createChat && <CreateChat endCreation={() => setCreateChat(false)} />}
        </div>
    )
} 

export default SideBar;