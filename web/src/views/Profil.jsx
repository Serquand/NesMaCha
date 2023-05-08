import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Profil = () => {
    const { userToken } = useSelector(state => state.user);
    const userName = useParams().userName;
    const navigate = useNavigate();

    useEffect(() => {
        console.log(!userToken);
        if(!userToken) {
            return navigate("/login"); 
        }
    }, []);

    return (
        <>
            <h1>Profil</h1>
        </>
    )
}

export default Profil;