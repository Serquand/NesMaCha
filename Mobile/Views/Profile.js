import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native';

import NavigationProfile from '../Components/Profile/NavigationProfile';

const Profile = ({ navigation }) => {
    const link = [
        {
            color: "black", 
            to: "CreateAnnounce", 
            text: "Créer une annonce", 
        }, 
        {
            color: "#14803a",
            to: "Settings",
            text: "Paramètres",
        },
        {
            color: "#1D497C",
            to: "History",
            text: "Historique"
        },
        {
            color: "#0089CB",
            to: "Credits",
            text: "Crédits"
        }
    ]

    return (
        <SafeAreaView>
            {link.map((navigationInfo, index) => 
                <View style={ styles.navigationContainer }>
                    <NavigationProfile 
                        key = { index }
                        color = { navigationInfo.color }
                        navigation = { navigation }
                        to = { navigationInfo.to }
                        text = { navigationInfo.text }
                    />
                </View>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    navigationContainer: {
        marginVertical: 10
    }
})

export default Profile;