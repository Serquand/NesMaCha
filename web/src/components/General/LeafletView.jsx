import "../../styles/css/index.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const LeaftLetView = (props) => { 
    const { center, allMarkers, zoomLevel } = props;

    return (
        <MapContainer
            className="markercluster-map"
            center={center}
            zoom={zoomLevel}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {allMarkers.map((marker, index) => (
                <Marker position={marker.coords} key={index}>
                    {marker.popUp && <Popup>{marker.popUp}</Popup>}
                </Marker>
            ))}
        </MapContainer>
    );
}   

export default LeaftLetView;