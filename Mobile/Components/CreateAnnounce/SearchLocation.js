import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import InputSearchLocation from "./InputSearchLocation";
import { urlApi } from "../../config.json";

const SearchLocation = () => {
    const [zipCode, setZipCode] = useState(0);
    const [adress, setAdress] = useState("");
    const [results, setResults] = useState([]);
    const [possibleCities, setPossibleCities] = useState([]); 
    const [city, setCity] = useState("");
    const [step, setStep] = useState(0);

    const generateUrlQuery = () => {
        return "https://api-adresse.data.gouv.fr/search/?q=" + 
            city.replaceAll(" ", "+") + "+" + adress.replaceAll(" ", "+") + "&postcode=" + zipCode
    } 

    const findAdresses = async () => {
        const res = await fetch(generateUrlQuery());
        const adresses = await res.json()
        console.log(adresses);
        setResults(adresses);
    }

    const findCities = async (zipCodeEntered) => {
        const res = await fetch(urlApi + "/carPooling/citiesByZip/" + zipCodeEntered)
        const communitiesrRes = (await res.json()).communities 
        
        switch(communitiesrRes.length) {
            case 0: return;

            case 1:
                setCity(communitiesrRes[0])
                setStep(2);
                break;

            default:      
                setPossibleCities(communitiesrRes);  
                setStep(1);
                break;
        }

        setZipCode(zipCodeEntered)
    }

    return (
        <SafeAreaView>
            { /* Zipcode */ }
            <InputSearchLocation 
                stateChanger = {findCities}
                titleLabel = "Code postal"
            /> 
    
            { /* City */ }
            {step != 0 && <InputSearchLocation 
                stateChanger = {setCity}
                titleLabel = "Ville"
                listChoice = { possibleCities }
            />} 
            
            { /* Adress */ }
            {step == 2 && <InputSearchLocation 
                stateChanger = {(adresse) => {
                    setAdress(adresse);
                    findAdresses()
                }}
                titleLabel = "Adresse"
            />} 
        </SafeAreaView>
    )
}

export default SearchLocation;