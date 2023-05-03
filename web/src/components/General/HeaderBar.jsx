import "../../styles/css/index.css";
import CardToProfil from "./CardToProfil"; 
import { useDispatch } from "react-redux";
import MenuHeader from "./MenuHeader";

const HeaderBar = () => {
    return (
        <header className="header">
            <div className="header-content">
                <MenuHeader />
                <CardToProfil />
            </div>
        </header>
    )
}

export default HeaderBar;