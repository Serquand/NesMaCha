import React, { useState } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TextInput } from 'react-native';
import SearchLocation from '../Components/CreateAnnounce/SearchLocation';

const CreateAnnounce = ({ navigation }) => {
    const [to, setTo] = useState({})
    const [from, setFrom] = useState({})
    const [step, setStep] = useState(0)

    const validateFromChoice = (information) => {
        setFrom(information)
        setStep(1)
    }

    const validateToChoice = (information) => {
        setTo(information)
        setStep(2)
    }

    return (
        <SafeAreaView style = { styles.mainContainer }>
            <View style={{ zIndex: 10 }}>
                <Text>Départ</Text>
                <SearchLocation submitChoice = { validateFromChoice }/>
            </View>

            {step != 0 && <View style={{ zIndex: 9 }}>
                <Text>Arrivée</Text>
                <SearchLocation submitChoice = { validateToChoice }/>
            </View>}

            {step > 1 && <View style={{ zIndex: 8 }}>
                <Text>Nombre de passagers attendus</Text>
                <TextInput
                    
                />
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