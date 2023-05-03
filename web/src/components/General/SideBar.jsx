import { Link } from "react-router-dom"
import "../../styles/css/index.css";
import { useSelector } from "react-redux";

const SideBar = () => {
    const { menuVisible } = useSelector(state => state.displayer)

    return (
        <section className={`sidebar ${(menuVisible ? 'sidebar-toggled' : '')}`}>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Accueil</Link>
                    </li>
                </ul>
            </nav>
        </section>
    )
} 

export default SideBar