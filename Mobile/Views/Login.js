import React, { useEffect, useState } from "react";
import { Pressable, View, Image, Text , StyleSheet} from "react-native";
import InputLogin from "../Components/Login/InputLogin";
import { urlApi } from "../config.json";
import AlertModal from "../Components/General/AlertModal";
import { io } from 'socket.io-client'

const Login = ({ navigation }) => {
    const socket = io(urlApi);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [mode, setMode] = useState("I");
    const [information, setInformation] = useState("")

    useEffect(() => {   
        socket.emit("test", "Message content")
    }, [])

    const handleLogin = async () => {
        const endpoint = mode == "I" ? "signin" : mode == "U" ? "signup" : "retrieve";
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                pseudo: username, 
                password, 
                email, 
                confirmPassword
            })
        }
        
        const res = await fetch(urlApi + "/user/" + endpoint, requestOptions);
        if(res.status == 201) {
            setInformation("Un mail vient de vous être envoyer concernant les étapes de validation de votre compte.")
        } else if(res.status == 200) {
            navigation.navigate("Home")
        } else {
            const error = await res.json().information;
            console.log(error);
            setInformation(error)
        }
    }

    return (
        <View style = {[ styles.mainView, styles.mainLogin, styles.mainFlex ]}>
            <View>
                <Image 
                    source = {require("../Assets/Logo.png")} 
                    style = { styles.logoImage } 
                />
            </View>

            <View style = {[ styles.mainFlex, styles.mainView, styles.flexCenter ]}>
                <Text style={ styles.title }>
                    { mode == "R" ? "Récupération" : mode == "I" ? "Connexion" : "Inscription" }
                </Text>
                {/* If we aren't in sign in mode */}
                {mode != 'I' && <InputLogin 
                    stateChanger={setEmail}
                    labelContent="Email"  
                    isPassword={ false }
                />}

                <InputLogin 
                    stateChanger={setUsername}
                    labelContent="Pseudo"  
                    isPassword={ false }
                />

                {/* If we aren't in reset password mode */}
                {mode != 'R' && <InputLogin 
                    stateChanger={setPassword}
                    labelContent="Mot de passe"  
                    isPassword={ true }
                />}

                {/* If we are in sign up mode */}
                {mode == 'U' && <InputLogin 
                    stateChanger={setConfirmPassword}
                    labelContent="Confirmer"
                    isPassword={ true }
                />}

                <Pressable 
                    onPress={() => handleLogin()}
                    style={ styles.loginButton }
                >
                    <Text style={{ color: "#fff", }}>
                        {   mode == "U" ? "Inscription" : 
                            mode == 'I' ? "Connexion" : 
                            "Reset password" 
                        }
                    </Text>
                </Pressable>
            </View>

            <View style={styles.bottomLogin}>
                <View>
                    <Text style={styles.toggleMode}>{ mode !== "U" ? "Pas de compte ?" : "Déjà un compte ?" }</Text>
                    <Pressable onPress={() => setMode((mode == "U" ? "I" : "U"))}>
                        <Text style={[ styles.toggleMode, { color: "#14803a" }]}>
                            { mode !== "U" ? "Inscrivez-vous ici !" : "Connectez-vous ici !" }
                        </Text>
                    </Pressable> 
                </View>

                {mode == "I" && <View style={{ marginTop: 10 }}>
                    <Text style={styles.toggleMode}>Mot de passe oublié ?</Text>
                    <Pressable onPress={() => setMode("R")}>
                        <Text style={[ styles.toggleMode, { color: "#14803a" }]}>
                            Récupérer mon mode de passe
                        </Text>
                    </Pressable>    
                </View>}
                
            </View> 
            
            {information != "" && <AlertModal 
                content = { information } 
                title="Information" 
            />}
        </View>
    )
}


const styles = StyleSheet.create({
    mainView: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "white", 
    },

    title: { 
        paddingBottom: 30, 
        fontSize: 18, 
        fontWeight: "bold", 
        textAlign: "center", 
        color: "#1D497C",
    },

    mainLogin: {
        paddingTop: 25, 
        paddingBottom: 25 
    },

    mainFlex: {
        display: "flex", 
        flexDirection: "column",
        alignItems: "center",
        zIndex: -1
    },

    flexCenter: {
        display: "flex", 
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: [{ translateY: -35 }]
    },

    bottomLogin: {    
        alignItems: "center",
        position: "absolute",
        bottom: 60
    },

    logoImage: {
        width: 100,
        height: 100,
        marginTop: 60,
    }, 

    loginButton: {
        paddingHorizontal: 35, 
        paddingVertical: 10,
        borderRadius: 10, 
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: '#14803a', 
    }, 

    toggleMode: {
        fontSize: 15, 
        textAlign: "center"
    }
});

export default Login;