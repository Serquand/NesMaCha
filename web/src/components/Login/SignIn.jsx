import "../../styles/css/index.css";
import "../../styles/css/connection.css";
import Logo from "../../assets/efrei_new-logo.png";
import Email from "../../assets/email.png";
import Tag from "../../assets/tag.png";
import Password from "../../assets/password.png";


const LogIn = () => {
    return (
        <div className="connection-block">
            <div className="connection-header">
                <img src={Logo} alt="Logo de l'application" />
                <span>Inscrivez vous</span>
            </div>
            

            <div className="input-block">
                <div className="input-field">
                    <img src={Email} alt="Icone d'email" />
                    <input id="email" type="text" placeholder="E-mail"/>
                </div>

                <div className="input-field">
                    <img src={Tag} alt="Icone de nom d'utilisateur" />
                    <input id="username" type="text" placeholder="Pseudonyme"/>
                </div>
                
                <div className="input-field">
                    <img src={Password} alt="Icone de mot de passe" />
                    <input id="password" type="password" placeholder="Mot de passe"/>
                </div>
            </div>

            <button>Connexion</button>
        </div>
    );
}

export default LogIn;