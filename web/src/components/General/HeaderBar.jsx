import "../../styles/css/index.css";
import HamburgerMenu from "./HamburgerMenu";
import CardToProfil from "./CardToProfil";

const HeaderBar = () => {
    return (
        <header className="header">
            <div className="header-content">
                <HamburgerMenu />
                <div className="header-logo">

                </div>
                <CardToProfil />
            </div>
        </header>
    )
}

export default HeaderBar;