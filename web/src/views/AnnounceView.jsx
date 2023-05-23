import { useEffect, useState } from "react";
import "../styles/css/index.css";
import { useParams } from "react-router-dom";
import informations from "../../informations.json";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AnnounceView = () => {
    const navigate = useNavigate();
    const idAnnouce = useParams().idAnnounce;
    const [info, setInfo] = useState({});
    const [fromDisplay, setFromDisplay] = useState("");
    const [toDisplay, setToDisplay] = useState("");
    const [dateDisplay, setDateDisplay] = useState("");

    const { userToken } = useSelector(state => state.user);
    useEffect(() => {
        if(!userToken) {
            return navigate("/"); 
        }
    }, []);

    useEffect(() => {
        const getInfo = async () => {
            const res = await fetch(informations.urlAPI + "/carPooling/" + idAnnouce);
            const data = await res.json();
            const date = new Date(parseInt(data?.dateDeparture));
            const displayDate = 
                date.getDate().toString().padStart(2, "0") + "/" +
                (date.getMonth() + 1).toString().padStart(2, "0") + "/" +
                date.getFullYear() + " - " + 
                date.getHours().toString().padStart(2, "0") + ":" +
                date.getMinutes().toString().padStart(2, "0");
            setDateDisplay(displayDate)
            setInfo(data);
            // if(!res.ok) // To handle
        };

        getInfo();
    }, []);

    useEffect(() => {
        const getAdress = async () => {
            const toRes = await fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${info.to.y}&lat=${info.to.x}`);
            const toData = (await toRes.json()).features[0].properties.name;
            setToDisplay(toData);

            const fromRes = await fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${info.from.y}&lat=${info.from.x}`);
            const fromData = (await fromRes.json()).features[0].properties.name;
            setFromDisplay(fromData);
        }   

        getAdress();
    }, [info]);

    return (
        <>
            <h2>Informations sur le covoiturage</h2> 
            <section style={{ textAlign: "center" }}>
                <p>Conducteur : <span>{ info?.driver }</span></p>
                <p>Départ : <span>{ fromDisplay }</span></p>
                <p>Arrivée : <span>{ toDisplay }</span></p>
                <p>Nombre de places : 
                    <span>{ info?.currentPassager } / { info?.maxPlace }</span>
                </p>
                <p>Heure : { dateDisplay }</p>
            </section>
        </>
    )   
};

export default AnnounceView;