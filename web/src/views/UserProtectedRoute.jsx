import Login from "./Login";
import { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import informations from "../../informations.json";

const UserProtectedRoute = async (props) => {
    const { children } = props;
    const [validity, setValidity] = useState(false);
    const { userToken, userName } = useSelector(state => state.user);

    const isAuth = async () => {
        if(userToken == "") return false;

        const requestOptions = {
            method: "GET", 
            headers: { "Authorization": "Bearer " + userToken }
        };

        const res = await fetch(informations.urlAPI + "/user/" + userName, requestOptions);
        setValidity(res.status == 200);
    }

    
    
    
    return (
        <main>
            <Login />
            {/* {validity ? children : <Login />} */}
        </main>
    )
}

export default UserProtectedRoute;