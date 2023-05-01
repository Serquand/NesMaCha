import { Link } from "react-router-dom"

const SideBar = () => {
    return (
        <section>
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