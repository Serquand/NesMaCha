import "../styles/css/index.css";
import { useState, useRef } from "react";
import TopLogin from "../components/Login/TopLogin";
import Email from "../assets/email.png"
import Password from "../assets/password.png";
import Tag from "../assets/tag.png";
import Loader from "../components/General/Loader";
import informations from "../../informations.json";
import Modal from "../components/General/Modal";
import { useDispatch } from "react-redux";
import { setLogin } from "../store/User";

const LoginPage = () => {
    const emailRef = useRef();
    const pseudoRef = useRef();
    const pwdRef = useRef();
    const resetPwdRef = useRef();
    const [loginMode, setLoginMode] = useState("Connexion");
    const [loading, setLoading] = useState(false);
    const [informationsModal, setInformationsModal] = useState("");
    const [titleInformation, setTitleInformation] = useState("")
    const [showInformations, setShowInformations] = useState(false);

    const switchSentence = {
        "Connexion": "Aucun compte ? Inscrivez-vous !", 
        "Inscription": "Vous avez déjà un compte ? Connectez-vous !",
        "Réinitialisation": "Mot de passe retrouvé ? Connectez-vous !"
    };
    const buttonSwitchTitle = {
        "Connexion": "Connexion", 
        "Inscription": "Inscription",
        "Réinitialisation": "Réinitialisation"
    };

    const dispatch = useDispatch();

    const formSubmit = async (event) => {
        event.preventDefault();
        
        // Get the informations
        const email = emailRef.current?.value; 
        const pseudo = pseudoRef.current?.value;
        const password = pwdRef.current?.value;
        const confirmPassword = resetPwdRef.current?.value;

        // Generate fetch params        
        const requestOptions = {
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({ email, pseudo, password, confirmPassword })
        };
        const endpoint = loginMode == "Connexion" ? "signin" : loginMode == "Inscription" ? "signup" : 'retrieve';

        // Put the loader
        setLoading(true);

        // Generate the request
        const res = await fetch(informations.urlAPI + "/user/" + endpoint, requestOptions);
        const data = await res.json();
            
        // Process the request response
        setInformationsModal(data.information);
        setTitleInformation(res.status < 300 ? "Succès" : "Erreur");
        setLoading(false);
        setShowInformations(true);

        // Set Login
        if(res.status < 300) {
            dispatch(setLogin({ userToken: data.token, userName: pseudo }))
        }
    }

    return (
        <form className="content" onSubmit={formSubmit}>
            <div className="connection-block">
                <TopLogin mode={loginMode} />

                {loginMode != "Connexion" && <div className="input-block">
                    <div className="input-field">
                        <img src={Email} alt="email icon" />
                        <input 
                            id="email" 
                            type="text" 
                            placeholder="E-mail"
                            ref={emailRef}
                        />
                    </div>
                </div>}

                {loginMode != "Réinitialisation" && <div className="input-field">
                    <img src={Tag} alt="Icone de nom d'utilisateur" />
                    <input 
                        id="username" 
                        type="text" 
                        placeholder="Pseudonyme"
                        ref={pseudoRef}
                    />
                </div>}
                
                {loginMode != "Réinitialisation" && <>
                    <div className="input-field">
                        <img src={Password} alt="password icon" />
                        <input 
                            id="password" 
                            type="password" 
                            placeholder="Mot de passe"
                            ref={pwdRef}
                        />
                    </div>
                    <p 
                        style={{ margin: '-35px 0 0 0', cursor: "pointer", color: "#2F51AF" }}
                        onClick={() => setLoginMode("Réinitialisation")}
                    >Mot de passe oublié ?</p>
                </>}

                {loginMode == "Inscription" && <div className="input-field">
                    <img src={Password} alt="password icon" />
                    <input 
                        id="password" 
                        type="password" 
                        placeholder="Vérification du mot de passe"
                        ref={resetPwdRef}
                    />
                </div>}

                <button type="submit">{ buttonSwitchTitle[loginMode] }</button>
            </div>
            <p 
                onClick={() => setLoginMode(loginMode == "Connexion" ? "Inscription" : "Connexion")}
                style={{ cursor: "pointer", color: "#2F51AF" }}
            >{ switchSentence[loginMode] }</p>

            {loading && <Loader />}
            {showInformations && <Modal
                closeModal = {() => setShowInformations(false)}
                createAction = {() => setShowInformations(false)}
                nameButton = "Fermer"
                titleModal = {titleInformation}
            >
                <p>{ informationsModal }</p>
            </Modal>}
        </form>
    )
}

export default LoginPage;