import React from 'react';
import { NavigationContainer as Nav } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Views/Login';
import Chat from './Views/Chat';
import ListPeopleChat from './Views/ListPeople';
import Profile from './Views/Profile';
import CreateAnnounce from './Views/CreateAnnouce';
import Partner from './Views/Partner';
import Settings from './Views/Settings';
import History from './Views/History';
import Credits from './Views/Credits';
import Home from './Views/Home';

const { Navigator, Screen } = createNativeStackNavigator();

export default function App() {
    return (
        <Nav>   
            <Navigator initialRouteName='Credits'>
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
                <Screen 
                    name="Profile" 
                    component={ Profile } 
                    options={{ headerShown: false }} 
                />
                <Screen 
                    name="CreateAnnounce" 
                    component={ CreateAnnounce } 
                    options={{ headerShown: false }} 
                />
                <Screen 
                    name="Partner" 
                    component={ Partner } 
                    options={{ headerShown: false }} 
                />
                <Screen 
                    name="History" 
                    component={ History } 
                    options={{ headerShown: false }} 
                />
                <Screen 
                    name="Settings" 
                    component={ Settings } 
                    options={{ headerShown: false }} 
                />
                <Screen 
                    name="Credits" 
                    component={ Credits } 
                    options={{ headerShown: false }} 
                />
                <Screen 
                    name="Home" 
                    component={ Home } 
                    options={{ headerShown: false }} 
                />
            </Navigator>
        </Nav>
    );
}