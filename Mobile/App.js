import React from 'react';
import { NavigationContainer as Nav } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Views/Login';
import Chat from './Views/Chat';
import ListPeopleChat from './Views/ListPeople';

const { Navigator, Screen } = createNativeStackNavigator();

export default function App() {
    return (
        <Nav>   
            <Navigator initialRouteName='Chat'>
                <Screen 
                    name='Login' 
                    component={ Login } 
                    options={{ headerShown: false }} 
                />
                <Screen 
                    name='Chat' 
                    component={ Chat } 
                    options={{ headerShown: false }} 
                />
                <Screen 
                    name="ListPeopleChat" 
                    component={ ListPeopleChat } 
                    options={{ headerShown: false }} 
                />
            </Navigator>
        </Nav>
    );
}