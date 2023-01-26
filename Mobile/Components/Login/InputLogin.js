import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const InputLogin = (loginInformation) => {
    const { labelContent, isPassword, stateChanger } = loginInformation
    const [hidden, setHidden] = useState(isPassword);

    return (
        <View style= { styles.container }>
            <View style = { styles.topInputLogin }>
                <Text style={ styles.label }>{ labelContent }</Text>
                {isPassword && (
                    <Pressable onPress={ () => setHidden(!hidden) }>
                        <Text style={styles.showOptions}>Show</Text>
                    </Pressable>
                )}
            </View>
            <TextInput 
                onChangeText = { stateChanger } 
                secureTextEntry = { hidden }
                style = { styles.textInput }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 200,
    },

    label: {
        fontSize: 16,
        color: '#14803a',
    }, 
    topInputLogin: {
        paddingTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }, 
    textInput: {
        borderWidth: 1,
        borderColor: '#14803a',
        paddingHorizontal: 5, 
        paddingVertical: 5
    }, 
    showOptions: {
        letterSpacing: 1, 
        fontSize: 14,
        color: '#14803a',
    }
});

export default InputLogin;