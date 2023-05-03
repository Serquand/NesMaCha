import { switchCategory } from "../../store/Displayer";
import '../../styles/css/index.css';
import { useDispatch } from "react-redux";
import Annonces from "../../assets/Annonces.png";
import Chat from "../../assets/Chat.png";
import Demandes from "../../assets/Demandes.png";
import Historique from "../../assets/Historique.png";

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
            categoryName: "Annonces"
        },
        {
            img: Demandes, 
            categoryName: "Demandes"
        },
        {
            img: Historique, 
            categoryName: "Historique"
        }
    ];

    return (
        <ul className="menu-header">
            {navOptions.map((option, index) => (
                <li 
                    onClick={() => toggleCategory(option.categoryName)} 
                    className="menu-header-element"
                    key={index}
                >
                    <img 
                        src={option.img} 
                        alt={option.categoryName} 
                    />
                </li>
            ))}
        </ul>
    )
}

export default MenuHeader;