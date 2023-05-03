import "../../styles/css/index.css";
import CardToProfil from "./CardToProfil"; 
import MenuHeader from "./MenuHeader";
import { useSelector } from "react-redux";

const HeaderBar = () => {
    const { userName } = useSelector(state => state.user);

    return (
        <header className="header">
            <div className="header-content">
                {/* {userName ? <MenuHeader /> : <div></div>} */}
                <MenuHeader />
                <CardToProfil />
            </div>
        </header>
    )
}

export default HeaderBar;