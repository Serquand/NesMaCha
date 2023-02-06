import React from 'react'
import { SafeAreaView, Text } from 'react-native';
import SearchLocation from '../Components/CreateAnnounce/SearchLocation';

const CreateAnnounce = ({ navigation }) => {
    return (
        <SafeAreaView>
            <SearchLocation />
        </SafeAreaView>
    )
}

export default CreateAnnounce;