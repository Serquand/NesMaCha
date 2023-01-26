import React from "react"; 
import { Pressable, StyleSheet, Text } from "react-native";

const NavigationProfile = (props) => {
    const { color, to, text, navigation } = props;
    
    return (
        <Pressable 
            onPress={() => navigation.navigate(to)}
            style = {[ styles.mainContainer, { borderColor: color } ]}
        >
            <Text style={{ color }}>{ text }</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        width: '80%',
        marginLeft: '10%',
        borderWidth: 1,
        borderRadius: 30, 
        paddingHorizontal: 25, 
        paddingVertical: 10
    }
})

export default NavigationProfile;