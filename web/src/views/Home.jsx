import "../styles/css/index.css";
import LeaftLetView from "../components/Home/LeafletView";
import { useState, useEffect } from "react";

const Home = () => {
    const efreiCoords = [48.788556, 2.364018];
    const [allCoords, setAllCoords] = useState([{ coords: efreiCoords, popUp: "EFREI Paris" }]);
    const [key, setKey] = useState(0);
    const zoomLevel = 12.5;
    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const temp = allCoords;
            temp.push({ 
                coords: [position.coords.latitude, position.coords.longitude], 
                popUp: "Votre localisation" 
            })
            setAllCoords(temp);
            setKey(key + 1);
        })
    }, []);

    return (
        <>
            <div id="map">
                <LeaftLetView 
                    center={efreiCoords} 
                    allMarkers={allCoords} 
                    zoomLevel={zoomLevel} 
                    key={key}
                />
            </div>
        </>
    )
}

export default Home;