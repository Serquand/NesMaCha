import { useEffect, useState } from "react";
import "../../styles/css/index.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const LeaftLetView = () => {
    const [geographicalPositon, setGeographicalPosition] = useState([]); 
    const [geographicalPositionAllowed, setGeographicalPositionAllowed] = useState(false)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setGeographicalPosition([position.coords.latitude, position.coords.longitude]);
            setGeographicalPositionAllowed(true);
        })
    }, []);

    return (
        <MapContainer
            className="markercluster-map"
            center={[48.788556, 2.364018]}
            zoom={12.5}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            <Marker position={[48.788556, 2.364018]}>
                <Popup>EFREI Paris</Popup>
            </Marker>
            {geographicalPositionAllowed && (
                <Marker position={ geographicalPositon }>
                    <Popup>Votre localisation</Popup>
                </Marker>
            )}
        </MapContainer>
    );
}   

export default LeaftLetView;