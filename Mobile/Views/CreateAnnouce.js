import React, { useState } from 'react'
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import SearchLocation from '../Components/CreateAnnounce/SearchLocation';

const CreateAnnounce = ({ navigation }) => {
    const [to, setTo] = useState({})
    const [from, setFrom] = useState({})
    const [step, setStep] = useState(0)

    const validateFromChoice = (information) => {
        setFrom(information)
        setStep(1)
    }

    return (
        <SafeAreaView style = { styles.mainContainer }>
            <View style={{ zIndex: 10 }}>
                <Text>Départ</Text>
                <SearchLocation submitChoice = { validateFromChoice }/>
            </View>

            {step != 0 && <View style={{ zIndex: 9 }}>
                <Text>Arrivée</Text>
                <SearchLocation />
            </View>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        position: "absolute",
        top: 0,
        bottom: 0, 
        left: 0, 
        right: 0, 
        backgroundColor: "white"
    }
})

export default CreateAnnounce;