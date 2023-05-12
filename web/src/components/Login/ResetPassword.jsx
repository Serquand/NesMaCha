import "../../styles/css/index.css";
import Email from "../../assets/email.png";


const LogIn = () => {
    return (
        <div className="connection-block">
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