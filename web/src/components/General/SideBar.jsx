import "../../styles/css/index.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import appInformations from "../../../informations.json";
import ListSelectChat from "../Chat/ListSelectChat";
import SelectAnnounce from "../Announce/SelectAnnounce";
import CreateChat from "../Chat/CreateChat";
import { socket } from "../../Socket/socket";

const SideBar = () => {
    const [informations, setInformations] = useState([]);
    const { category } = useSelector(state => state.displayer);
    const { userName } = useSelector(state => state.user);

    const [createChat, setCreateChat] = useState(false);
    const [isVisibled, setIsVisible] = useState(false);

    const endpoints = {
        Chat: "/chat/list", 
        Annonces: "/chat/list", 
        Demandes: "/chat/list",
        Historiques: "/chat/list"
    }

    socket?.on("newInformation", (payload) => {
        if(payload.type == "newGroup" && category == "Chat") {
            setInformations([...informations, payload.newChannel])
        }
    })

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(appInformations.urlAPI + endpoints[category] + "/" + userName);
                if(!res.ok) return setInformations([]);
                const data = await res.json();
                setInformations(data.list);
            } catch {
                setInformations([]);
            }
        })();

        setIsVisible(!!userName)
    }, [category, userName])

    return (
        <div>
            {isVisibled && <section className="sidebar">
                {category == "Chat" && <ListSelectChat 
                    informations={informations} 
                    startCreation={() => setCreateChat(true)}
                />}
                {category == "Annonces" && <SelectAnnounce listAnnounce={informations} />}
            </section>}
            {createChat && <CreateChat endCreation={() => setCreateChat(false)} />}
        </div>
    )
} 

export default SideBar;