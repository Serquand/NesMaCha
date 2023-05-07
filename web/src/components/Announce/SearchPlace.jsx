import { useState } from "react";
import "../../styles/css/index.css";

const SearchPlace = (props) => {
    const { updatePlace } = props;
    const [step, setStep] = useState(1);
    
    return (
        <>
            <div className="search-place">
                <div className="search-place-city">
                    <input 
                        type="text" 
                        placeholder="Code postal"
                        className="search-place-city-zipcode"
                    />
                    <input 
                        type="text"
                        placeholder="Ville"
                        disabled={step == 2}
                        className="search-place-city-input"
                    />
                </div>
                <div className="search-place-adress">
                    <input 
                        type="text" 
                        placeholder="Adresse"
                        disabled={step == 3}
                        className="search-place-adress-input"
                    />
                </div>
            </div>
        </>
    );
}

export default SearchPlace;