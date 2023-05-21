import { switchCategory } from "../../store/Displayer";
import '../../styles/css/index.css';
import { useDispatch } from "react-redux";
import Annonces from "../../assets/Annonces.png";
import Chat from "../../assets/Chat.png";
import Demandes from "../../assets/Demandes.png";
import Historique from "../../assets/Historique.png";
import Home from "../../assets/home.png";
import { Link } from "react-router-dom";

const MenuHeader = () => {
    const dispatch = useDispatch();

    const toggleCategory = (newCategory) => dispatch(switchCategory(newCategory))

    const navOptions = [
        {
            img: Chat, 
            categoryName: "Chat"
        },
        {
            img: Annonces, 
            categoryName: "Annonces",
            redirectTo: "/announce"
        },
        {
            img: Demandes, 
            categoryName: "Demandes"
        },
        {
            img: Historique, 
            categoryName: "Historique"
        }, 
        {
            img: Home, 
            categoryName: "Accueil", 
            redirectTo: "/home"
        }
    ];

    return (
        <ul className="menu-header">
            {navOptions.map((option, index) => (
                <div
                    className="menu-header-element"
                    key={index}
                    onClick={() => toggleCategory(option.categoryName)}
                >
                    {option.redirectTo ? (
                        <Link to={option.redirectTo}>
                            <li>
                                <img 
                                    src={option.img} 
                                    alt={option.categoryName} 
                                />
                            </li>
                        </Link>) : (
                        <li>
                            <img 
                                src={option.img} 
                                alt={option.categoryName} 
                            />
                        </li>
                    )}
                </div>
            ))}
        </ul>
    )
}

export default MenuHeader;