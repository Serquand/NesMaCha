import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Text, TextInput, View, Pressable } from "react-native";
import { urlApi } from "../../config.json";

const SearchLocation = (props) => {
    const [zipCode, setZipCode] = useState(0);
    const [adress, setAdress] = useState("");
    const [results, setResults] = useState([]);
    const [allCities, setAllCities] = useState([]);
    const [possibleCities, setPossibleCities] = useState([]); 
    const [city, setCity] = useState("");
    const [step, setStep] = useState(0);
    const { submitChoice } = props;

    const generateUrlQuery = (adressSearched) => {
        return "https://api-adresse.data.gouv.fr/search/?q=" + 
            city.replaceAll(" ", "+") + "+" + adressSearched.replaceAll(" ", "+") + "&postcode=" + zipCode
    } 

    const findAdresses = async (adressSearched) => {
        const res = await fetch(generateUrlQuery(adressSearched));
        const adresses = await res.json()
        setResults(adresses.features);
        setAdress(adressSearched)
    }

    const selectAdress = (choice) => {
        setResults([])
        setAdress(choice.properties.name)
        submitChoice({
            xCoordinate: choice.geometry.coordinates["0"],
            yCoordinate: choice.geometry.coordinates["1"],
            name: choice.properties.name,
            city: choice.properties.city,
            zipCode: choice.properties.postcode,
        })
    }

    const findCities = async (zipCodeEntered) => {
        const res = await fetch(urlApi + "/carPooling/citiesByZip/" + zipCodeEntered)
        const communitiesrRes = (await res.json()).communities 
        
        switch(communitiesrRes.length) {
            case 0: return;

            case 1:
                setCity(communitiesrRes[0])

                break;

            default:      
                setAllCities(communitiesrRes); 
                setPossibleCities(communitiesrRes); 
                break;
        }

        setStep(1);
        setZipCode(zipCodeEntered)
    }

    return (
        <SafeAreaView style={{ position: "relative" }}>
            { /* Zipcode */ }
            <View style = {[styles.inputContainer, { position: "relative", zIndex: 0 }]}>
                <Text style = { styles.inputLabel }>Code postal</Text>
                <TextInput 
                    style = { styles.inputField }
                    onChangeText = {input => {
                        if(input.length == 5) findCities(input)
                    }} 
                />
            </View>
    
            { /* City */ }
            {step != 0 && (
                <View style = {[styles.inputContainer, { position: "relative", zIndex: 2 }]}>
                    <Text style = { styles.inputLabel }>Ville</Text>
                    <TextInput 
                        style = { styles.inputField }
                        onChangeText = {input => {
                            setPossibleCities(allCities.filter(city => {
                                return city.includes(input.toUpperCase())
                            }))
                            setCity(input)
                        }} 
                        value = { city }
                    />
                    <View>
                        {possibleCities && possibleCities.map((possibleChoice) => (
                            <Pressable 
                                key={possibleChoice}
                                style = { styles.pressableChoice }
                                onPress= {() => {
                                    setCity(possibleChoice)
                                    setPossibleCities([])
                                }}
                            >
                                <Text>{ possibleChoice }</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
            )} 
            
            { /* Adress */ }
            {step != 0 && <View style = {[styles.inputContainer, { position: "relative", zIndex: 1 }]}>
                <Text style = { styles.inputLabel }>Adresse</Text>
                <TextInput 
                    style = { styles.inputField }
                    onChangeText = {input => {
                        findAdresses(input)
                        
                    }} 
                    value = { adress }
                />
                <View>
                    {results && results.map((possibleChoice, index) => (
                        <Pressable
                            key={index}
                            style = { styles.pressableChoice }
                            onPress= {() => selectAdress(possibleChoice)}   
                        >
                            <Text>{ possibleChoice.properties.name }</Text>
                        </Pressable>
                    ))}
                </View>
            </View>} 
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '80%',
        margin: "auto",
        height: 30,
        display: "flex",
        justifyContent: "flex-start",
        marginBottom: 25, 
        position: "relative"
    },

    inputField: {
        padding: 10, 
        height: 30, 
        borderColor: "#555",
        borderWidth: 1,
        borderRadius: 15,     
    },

    inputLabel: {
        paddingLeft: 10,
        paddingBottom: 5
    },

    pressableChoice: {
        height: 20, 
        flex: "center",
        justifyContent: "center", 
        backgroundColor: "white",
        borderColor: "#555",
        borderWidth: 1
    }
})

export default SearchLocation;