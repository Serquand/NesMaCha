import { useEffect } from "react";
import "../styles/css/index.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    
    const { userToken } = useSelector(state => state.user);
    useEffect(() => {
        if(!userToken) {
            return navigate("/"); 
        }
    }, []);

    return (
        <main className="not-found-main-container">
            <div className="info">
                <div className="glitch-bloc">
                    <p className="invisible-text">404</p>
                    <p className="glitchedAnim">404</p>
                    <p className="glitchedAnim">404</p>
                    <p className="glitchedAnim">404</p>
                </div>
                <p className="txt-info">Page not found...</p>
            </div>
        </main>
    );
}

export default NotFound;