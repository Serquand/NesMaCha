import { Link } from "react-router-dom"
import "../../styles/css/index.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import appInformations from "../../../informations.json";

const SideBar = (props) => {
    const { menuVisible } = useSelector(state => state.displayer)
    const [informations, setInformations] = useState([]);
    const { category } = useSelector(state => state.displayer)

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
            console.log(data);
            setInformations(data.list);
        }
        
        fetcher();
    }, [category])

    return (
        <section className={`sidebar ${(menuVisible ? 'sidebar-toggled' : '')}`}>
        </section>
    )
} 

export default SideBar