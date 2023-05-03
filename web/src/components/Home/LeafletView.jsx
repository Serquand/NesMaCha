import "../../styles/css/index.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

const LeaftLetView = () => {
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

            <Marker position={[48.788556, 2.364018]} />
        </MapContainer>
    );
}   

export default LeaftLetView;