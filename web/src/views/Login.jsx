import { useEffect, useRef, useState } from "react";
import "../styles/css/index.css";
import TopLogin from "../components/Login/TopLogin";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const lastNameRef = useRef();
    const firstNameRef = useRef();
    const emailRef = useRef();
    const pseudoRef = useRef();
    const pwdRef = useRef();
    const resetPwd = useRef();
    const [loginMode, setLoginMode] = useState("Connexion");
    const { userToken, userName } = useSelector(state => state.user);
    const navigate = useNavigate();

    const titleSentence = {
        "Connection": "Connectez-vous à votre compte", 
        "Inscription": "Bienvenue ! Créez votre compte maintenant !",
        "Réinitialisation": "Réinitialisez votre mot de passe !"
    }, switchSentence = {
        "Connection": "Aucun compte ?", 
        "Inscription": "Vous avez déjà un compte ?",
        "Réinitialisation": "Mot de passe retrouvé ?"
    }, buttonSwitchTitle = {
        "Connection": "S'inscrire", 
        "Inscription": "Connectez-vous !",
        "Réinitialisation": "Connectez-vous !"
    }

    useEffect(() => {
        if(!!userToken) {
            return navigate("/profile/" + userName); 
        }
    }, []);

    const formSubmit = (event) => {
        event.preventDefault();
        console.log("We have submitted the form !");
    }

    return (
        <>
            <section className="login" onSubmit={formSubmit}>
                <h2>{ loginMode }</h2>
                <section>
                    <TopLogin />
                    <form action="login-form form">
                        <h3>{ titleSentence[loginMode] }</h3>
                        {loginMode == "Inscription" && <input 
                            type="text" 
                            placeholder="Nom"
                            ref={ lastNameRef }
                        />}

                        {loginMode == "Inscription" && <input 
                            type="text" 
                            placeholder="Prénom"
                            ref={ firstNameRef }
                        />}

                        {loginMode == "Inscription" && <input 
                            type="email"
                            placeholder="Adresse email"
                            ref={ emailRef }
                        />}

                        <input 
                            type="text" 
                            placeholder="Pseudo"
                            ref={ pseudoRef }
                        />

                        {loginMode !== "Réinitialisation" && <input 
                            type="password" 
                            placeholder="Mot de passe"
                            ref={ pwdRef }
                        />}

                        {loginMode == "Inscription" && <input 
                            type="password" 
                            placeholder="Vérifier votre mot de passe"
                            ref={ resetPwd }
                        />}

                        <button type="submit">{ loginMode }</button>
                    </form>
                </section>
                <div className="login-switch-mode">
                    <p>{ switchSentence[loginMode] }</p>
                    <button type="button">{ buttonSwitchTitle[loginMode] }</button>
                </div>
            </section>
        </>
    )
}

export default Login;