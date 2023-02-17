import React from 'react'
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import SearchLocation from '../Components/CreateAnnounce/SearchLocation';

const CreateAnnounce = ({ navigation }) => {
    return (
        <SafeAreaView style = { styles.mainContainer }>
            <Text>TEST</Text>
            <SearchLocation />
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