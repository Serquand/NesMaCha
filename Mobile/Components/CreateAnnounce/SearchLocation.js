import React, { useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";

const SearchLocation = () => {
    const [postalCode, setPostalCode] = useState(0);
    const [adress, setAdress] = useState("");
    const [results, setResults] = useState([]);

    const generateUrlQuery = () => {
        return "https://api-adresse.data.gouv.fr/search/?q=" + 
            adress.replaceAll(" ", "+") + 
            "&limit=35&postalcode=" + postalCode  
    } 

    const findAdress = async () => {
        const res = await fetch(generateUrlQuery());
        results = await res.json();
    }

    return (
        <View>
            <TextInput />
            <TextInput />
            
            <ScrollView>

            </ScrollView>
        </View>
    )
}

export default SearchLocation;