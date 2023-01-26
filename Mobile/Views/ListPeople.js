import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import PeopleComponent from '../Components/ListPeopleChat/People';

const datas = [
    {
        noSeenMessage: false, 
        haveAPP: false,        
        lastHour: "24/11",
        nickname: "Lucario", 
        lastMessage: "Luca ! Luca", 
    },
    {
        noSeenMessage: true, 
        haveAPP: false,
        lastHour: "17:24", 
        nickname: "Raichu", 
        lastMessage: "Raiiiiiiiiiiiiiiiiiiiiiiiichhhhhhhhhhhhhuuuuuuuuuuuuuuuuuuuuu !",
    },
]

const ListPeopleChat = ({ navigation }) => {
    const [people, setPeople] = useState([])

    useEffect(() => {
        setPeople(datas)
    }, [])

    return (
        <SafeAreaView>
            <ScrollView style={ styles.mainView }>
                {people.map((person, index) => (
                    <PeopleComponent 
                        key = { index }
                        noSeenMessage = { person.nosSeenMessage }
                        lastHour = { person.lastHour }
                        nickname = { person.nickname }
                        haveAPP = { person.haveAPP }
                        lastMessage = { person.lastMessage }
                        navigation = { navigation }
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
})

export default ListPeopleChat;