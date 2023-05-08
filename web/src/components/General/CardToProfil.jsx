import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../styles/css/index.css";
import Profile from "../../assets/Profile.png";

const CardToProfil = () => {
    const { userName } = useSelector(state => state.user)

    return (
        <Link to="/login">
            <div className="card-to-profile card">
                <p className="card-to-profile-username">
                    { userName == "" ? "Connexion" : userName }
                </p>
                <img 
                    className="card-to-profile-img" 
                    src={ Profile } 
                    alt="Profil" 
                />
            </div>
        </Link>
    )
}

export default CardToProfil;