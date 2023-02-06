import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native"
 
const AlertModal = (props) => {
    const { title, content } = props
    return (
        <View style = { styles.modalContainer }>
            <View style = { styles.modal }>
                <View style={ styles.headerModal }>
                    <Text>{ title }</Text>
                </View>

                <View style={ styles.modalContent }>
                    <Text>{ content }</Text>
                </View>

                <View style = { styles.buttonCloseContainer }>
                    <Pressable>
                        <Text></Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        position: "absolute", 
        top: 0, 
        bottom: 0, 
        left: 0, 
        right: 0, 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 15, 
        backgroundColor: "#3338"
    },

    modal: {
        padding: 30, 
        backgroundColor: "white",
        borderRadius: 10,
    }
})

export default AlertModal;