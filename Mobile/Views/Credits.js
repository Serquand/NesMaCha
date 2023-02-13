import React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";

const Credits = ({ navigation }) => {
    const creditInformations = [
        {
            title: "Développeurs",
            crediters: [
                "DEREGNAUCOURT Mélissa", 
                "LA TOUR Marion",
                "TONETTE Jules",
                "VINCENT Esteban",
                "WASKAR Mehdi",
            ],
        },
        {
            title: "Responsables de projet",
            crediters: [
                "GORGETTE David",
                "MARGUET Vincent",
                "VINCENT Esteban"
            ]
        }
    ]

    return (
        <View style={ styles.mainContainer }>
            <Text style= { styles.titleCredits }>Crédits</Text>
            <View style = { styles.informationContainer }>
                {creditInformations.map(information => (
                    <View>
                        <Text style={ styles.informationText }>
                            <Text style={ styles.titleInformation }>{ information.title }</Text>
                            {information.crediters.map(crediter => (
                                <Text>{ crediter }</Text>
                            ))}
                        </Text> 
                    </View>
                ))}
            </View>
            <Pressable onPress={() => navigation.navigate('Profile')}>
                <Text style = { styles.buttonBack } >Retour au profil</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    titleCredits: {
        fontSize: 20, 
        fontWeight: "600",
        textDecorationLine: "underline",
        textAlign: "center",
        marginBottom: 20
    },

    informationText: {
        textAlign: "center", 
        display: "flex", 
        flexDirection: "column",
        marginBottom: 10
    },

    titleInformation: {
        marginBottom: 5, 
        fontWeight: 500,
        fontSize: 15,
        textDecorationLine: "underline"
    },  

    informationContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 15   
    },

    mainContainer: {
        position: "absolute",
        top: 0, 
        bottom: 0, 
        left: 0, 
        right: 0, 
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },

    buttonBack: {
        paddingHorizontal: 35, 
        paddingVertical: 10,
        borderRadius: 10, 
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: '#14803a', 
        color: "white"
    }
})

export default Credits;