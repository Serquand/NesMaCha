import "../../styles/css/index.css";
import "../../styles/css/connection.css";
import Logo from "../../assets/efrei_new-logo.png";
import Email from "../../assets/email.png";
import Password from "../../assets/password.png";


const LogIn = () => {
    return (
        <div className="connection-block">
            <div className="connection-header">
                <img src={Logo} alt="Logo de l'application" />
                <span>Connectez vous</span>
            </div>
            

            <div className="input-block">
                <div className="input-field">
                    <img src={Email} alt="email icon" />
                    <input id="email" type="text" placeholder="E-mail"/>
                </div>
                
                <div className="input-field">
                    <img src={Password} alt="password icon" />
                    <input id="password" type="password" placeholder="Mot de passe"/>
                </div>
            </div>

            <button>Connexion</button>
        </div>
    );
}

export default LogIn;