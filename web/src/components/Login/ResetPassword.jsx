import "../../styles/css/index.css";
import "../../styles/css/connection.css";
import EmailLetter from "../../assets/send-email.png";
import Email from "../../assets/email.png";


const LogIn = () => {
    return (
        <div className="connection-block">
            <div className="connection-header">
                <img src={EmailLetter} alt="Email letter" />
                <span>Réinitialiser votre mot de passe</span>
            </div>
            

            <div className="input-block">
                <div className="input-field">
                    <img src={Email} alt="email icon" />
                    <input id="email" type="text" placeholder="E-mail"/>
                </div>
            </div>

            <button>Réinitialiser</button>
        </div>
    );
}

export default LogIn;