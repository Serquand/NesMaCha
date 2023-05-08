import LogIn from "../components/Login/LogIn";
import SignIn from "../components/Login/SignIn";
import ResetPassword from "../components/Login/ResetPassword";
import "../styles/css/index.css";
import "../styles/css/connection.css";


const DefaultPage = () => {
    // const lastNameRef = useRef();
    // const firstNameRef = useRef();
    // const emailRef = useRef();
    // const pseudoRef = useRef();
    // const pwdRef = useRef();
    // const resetPwd = useRef();
    // const [loginMode, setLoginMode] = useState("Connexion");

    // const titleSentence = {
    //     "Connection": "Connectez-vous à votre compte", 
    //     "Inscription": "Vous n'avez pas de compte ?",
    //     "Réinitialisation": "Mot de passe oublié"
    // };
    // const switchSentence = {
    //     "Connection": "Aucun compte ?", 
    //     "Inscription": "Vous n'avez pas de compte ?",
    //     "Réinitialisation": "Mot de passe retrouvé ?"
    // };
    // const buttonSwitchTitle = {
    //     "Connection": "Connectez-vous !", 
    //     "Inscription": "S'inscrire",
    //     "Réinitialisation": "Connectez-vous !"
    // };

    var connection_section = <SignIn />;
    var other_connection = "";


    const formSubmit = (event) => {
        event.preventDefault();
        console.log("We have submitted the form !");
    }

    return (
        <section className="content" onSubmit={formSubmit}>
            {connection_section}

            <div>
                {other_connection}
            </div>
        </section>
    )
}

export default DefaultPage;