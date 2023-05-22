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
            setInfo(data);
            // if(!res.ok) // To handle
        };

        getInfo();
    }, []);

    return (
        <></>
    )
};

export default AnnounceView;