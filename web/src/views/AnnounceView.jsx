import { useEffect, useState } from "react";
import "../styles/css/index.css";
import { useParams } from "react-router-dom";
import informations from "../../informations.json";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const AnnounceView = () => {
    const navigate = useNavigate();
    const idAnnouce = useParams().idAnnounce;
    const [info, setInfo] = useState({});
    const [fromDisplay, setFromDisplay] = useState("");
    const [toDisplay, setToDisplay] = useState("");
    const [dateDisplay, setDateDisplay] = useState("");
    const [allMarkers, setAllMarkers] = useState([]);
    const [center, setCenter] = useState(null);

    const { userToken } = useSelector(state => state.user);
    useEffect(() => {
        if(!userToken) {
            return navigate("/"); 
        }
    }, []);

    useEffect(() => {
        const getInfo = async () => {
            const res = await fetch(informations.urlAPI + "/carPooling/" + idAnnouce);
            if(!res.ok) {
                return navigate("/notFound")
            }

            const data = await res.json();
            console.log(data);
            const date = new Date(parseInt(data?.dateDeparture));
            const displayDate = 
                date.getDate().toString().padStart(2, "0") + "/" +
                (date.getMonth() + 1).toString().padStart(2, "0") + "/" +
                date.getFullYear() + " - " + 
                date.getHours().toString().padStart(2, "0") + ":" +
                date.getMinutes().toString().padStart(2, "0");
            setDateDisplay(displayDate)
            setInfo(data);
            setAllMarkers([
                { 
                    coords: [data.from.x, data.from.y], 
                    popUp: "Départ" 
                },
                {
                    coords: [data.to.x, data.to.y], 
                    popUp: "Arrivée" 
                }
            ]);
            setCenter([data.from.x, data.from.y]);
        };

        getInfo();
    }, []);

    useEffect(() => {
        const getAdress = async () => {
            try {
                const toRes = await fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${info?.to.y}&lat=${info?.to.x}`);
                const toData = (await toRes.json()).features[0].properties.name;
                setToDisplay(toData);

                const fromRes = await fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${info?.from.y}&lat=${info?.from.x}`);
                const fromData = (await fromRes.json()).features[0].properties.name;
                setFromDisplay(fromData);
            } catch {
                setToDisplay("");
                setFromDisplay("");
            }
        }   

        getAdress();
    }, [info]);

    return (
        <section className="announce-view">
            <h2>Informations sur le covoiturage</h2> 
            <section style={{ textAlign: "center" }}>
                <p>Conducteur : <span>{ info?.driver }</span></p>
                <p>Départ : <span>{ fromDisplay }</span></p>
                <p>Arrivée : <span>{ toDisplay }</span></p>
                <p>Nombre de places : 
                    <span> { info?.currentPassenger } / { info?.maxPlace }</span>
                </p>
                <p>Heure : { dateDisplay }</p>
            </section>  

            <MapContainer
                className="markercluster-map"
                center={center ?? [48.788556, 2.364018]}
                zoom={11}
                style={{ width: "800px", height: "400px" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />

                {allMarkers?.map((marker, index) => (
                    <Marker position={marker.coords} key={index}>
                        {marker.popUp && <Popup>{marker.popUp}</Popup>}
                    </Marker>
                ))}
            </MapContainer>
        </section>
    )   
};

export default AnnounceView;