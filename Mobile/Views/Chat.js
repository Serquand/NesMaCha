import React from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native';

import HeaderChat from '../Components/Chat/HeaderChat';
import Messages from '../Components/Chat/Messages';


const Chat = ({ navigation }) => {
    return (
        <SafeAreaView style={ styles.mainView }>
            <HeaderChat 
                nickname = "Lucario"
                noSeenMessage = { 5 }
                haveAPP = { false }
                navigation = { navigation }
            />
            <Messages />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainView: {
        position: "absolute", 
        top: 0, 
        left: 0, 
        bottom: 0, 
        right: 0, 
        backgroundColor: "#fff"
    }, 
})

export default Chat;