// --------------- Libraries import ---------------
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// --------------- Components import ---------------
import TopLogin from "../components/Login/TopLogin";
import Loader from "../components/General/Loader";
import Modal from "../components/General/Modal";
import InputField from "../components/General/InputField";
// ----------------- Images import -----------------
import Email from "../assets/email.png"
import Tag from "../assets/tag.png";
import Password from "../assets/password.png";
import PasswordCheck from "../assets/password-check.png";
// ----------------- Other import -----------------
import "../styles/css/index.css";
import informations from "../../informations.json";
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
    const [codeDisplayed, setCodeDisplayed] = useState("------");
    const [pseudoSave, setPseudoSave] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userName } = useSelector(state => state.user);

    useEffect(() => {
        if(userName) navigate("/home")
    }, [])

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

    const input_data = {
        email: {
            img: {
                icon: Email,
                alt: "email icon"
            },
            input: {
                id: "email",
                placeholder: "E-mail",
                ref: emailRef
            }
        },
        pseudo: {
            img: {
                icon: Tag,
                alt: "user icon"
            },
            input: {
                id: "username",
                placeholder: "Pseudo",
                ref: pseudoRef
            }
        },
        password_check: {
            img: {
                icon: PasswordCheck,
                alt: "password check icon"
            },
            input: {
                id: "password",
                type: "password",
                placeholder: "Vérification du mot de passe",
                ref: resetPwdRef
            }
        },
        password: {
            img: {
                icon: Password,
                alt: "password icon"
            },
            input: {
                id: "password",
                type: "password",
                placeholder: "Mot de passe",
                ref: pwdRef
            }
        }
    }

    const checkCodeLength = (input) => {
        if (input.length == 6) {
            return setCodeDisplayed(input)
        }
        if (input.length == 7) {
            return setCodeDisplayed(input.slice(0, 6));
        }
        return setCodeDisplayed(input.padEnd(6, "-"));
    }

    const formSubmit = async (event) => {
        event.preventDefault();
        
        // Get the informations
        const email = emailRef.current?.value; 
        const pseudo = pseudoRef.current?.value ?? pseudoSave;
        setPseudoSave(pseudo);
        const password = pwdRef.current?.value;
        const confirmPassword = resetPwdRef.current?.value;
        const code = codeDisplayed;

        // Generate fetch params        
        const requestOptions = {
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({ email, pseudo, password, confirmPassword, code })
        };
        
        let endpoint;
        if(loginMode == "Connexion") endpoint = "signin";
        else if(loginMode == "Inscription") endpoint = "signup";
        else if(loginMode == "Validation") endpoint = "validAccount";
        else endpoint = 'retrieve';

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

        // Send validation of account
        if(res.status == 201) return setLoginMode("Validation");

        // If is successfully logged in
        if(res.status == 200) {
            dispatch(setLogin({ userToken: data.token, userName: pseudo }))
            navigate("/home");
        }
    }


    return (
        <form className="content" onSubmit={formSubmit}>
            <div className="connection-block">
                <TopLogin mode={loginMode}/>
                    
                {/*---------   Champ pour l'email   ---------*/}
                {loginMode != "Connexion" && loginMode != "Validation" && <InputField
                    img={input_data["email"].img}
                    input={input_data["email"].input}
                >
                </InputField>}

                {/*---------   Champ pour le pseudo   ---------*/}
                {loginMode != "Réinitialisation" && loginMode != "Validation" && <InputField
                    img={input_data["pseudo"].img}
                    input={input_data["pseudo"].input}
                >
                </InputField>}
                
                {/*---------   Champ pour le mot de passe   ---------*/}
                {loginMode != "Réinitialisation" && loginMode != "Validation" && <>
                    <InputField
                        img={input_data["password"].img}
                        input={input_data["password"].input}
                    >
                    </InputField>

                    {loginMode == 'Connexion' && <p 
                        style={{ margin: '-35px 0 0 0', cursor: "pointer", color: "#2F51AF" }}
                        onClick={() => setLoginMode("Réinitialisation")}
                    >Mot de passe oublié ?</p>}
                </>}

                {/*---------   Deuxième champ pour le mot de passe   ---------*/}
                {loginMode == "Inscription" && loginMode != "Validation" && <InputField
                    img={input_data["password_check"].img}
                    input={input_data["password_check"].input}
                >
                </InputField>}

                {/*---------   Validation du compte   ---------*/}
                {loginMode == "Validation" && <label htmlFor="valid-code-input" className="valid-label">
                    <input 
                        type="text" 
                        id="valid-code-input"
                        onInput={(event) => checkCodeLength(event.target.value)}
                        className="input-login input-login-code"
                    />

                    <div className="information-check-container">
                        {/* <p>{ codeDisplayed }</p> */}
                        <button className="login-button">Vérifier le code</button>
                    </div>
                </label>}

                <button type="submit">{ buttonSwitchTitle[loginMode] }</button>
            </div>

            {loginMode != "Validation" && <p 
                onClick={() => setLoginMode(loginMode == "Connexion" ? "Inscription" : "Connexion")}
                style={{ cursor: "pointer", color: "#2F51AF" }}
            >{ switchSentence[loginMode] }</p>}

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