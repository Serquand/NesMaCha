import { Link } from "react-router-dom"
import "../../styles/css/index.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const SideBar = (props) => {
    const { categorySearched } = props;
    const { menuVisible } = useSelector(state => state.displayer)
    const [informations, setInformations] = useState([]);

    const endpoints = {
        Chat: "", 
        Annonces: "", 
        Demandes: "",
        Historiques: ""
    }

    const listInformations = () => {
        console.log("Nous allons lister toutes les informations de la sidebar !");
    }

    useEffect(() => listInformations(), [categorySearched])

    return (
        <section className={`sidebar ${(menuVisible ? 'sidebar-toggled' : '')}`}>
        </section>
    )
} 

export default SideBar