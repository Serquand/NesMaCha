import "../../styles/css/index.css";
import EmailLetter from "../../assets/send-email.png";
import Logo from "../../assets/efrei_new-logo.png";

const TopLogin = (props) => {
    const { mode } = props;

    const titleSentence = {
        "Connexion": "Connectez-vous à votre compte", 
        "Inscription": "Vous n'avez pas de compte ?",
        "Réinitialisation": "Mot de passe oublié"
    };

    const imageDisplay = mode == "Réinitialisation" ? EmailLetter : Logo;

    return (
        <>
            <div className="connection-header">
                <img src={imageDisplay} alt="LogIn Image" />
                <span>{ titleSentence[mode] }</span>
            </div>
        </>
    )
}

export default TopLogin;