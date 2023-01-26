import { NavigationContainer as Nav } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./Views/Login.js"

const { Navigator, Screen } = createNativeStackNavigator();

export default function App() {
    return (
        <Nav>
            <Navigator initialRouteName="Login">
                <Screen 
                    name="Login" 
                    component={ Login } 
                    options={{ headerShown: false }} />
            </Navigator>
        </Nav>
    );
}