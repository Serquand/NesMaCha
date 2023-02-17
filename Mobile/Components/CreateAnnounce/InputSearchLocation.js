import React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";

const InputSearchLocation = (inputSearchProps) => {
    const { stateChanger, listChoice, titleLabel } = inputSearchProps;

    return (
        <View style = { styles.inputContainer }>
            <Text style = { styles.inputLabel }>{ titleLabel }</Text>
            <TextInput 
                style = { styles.inputField }
                onChangeText = {input => {
                    if(!(titleLabel == "Code postal" && input.length != 5)) {
                        stateChanger(input) 
                    }
                }} 
            />
        </View>
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
    }
})

export default InputSearchLocation;