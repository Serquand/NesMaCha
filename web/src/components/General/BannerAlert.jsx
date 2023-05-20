import { useEffect, useState } from "react";
import "../../styles/css/index.css";
import { socket } from "../../Socket/socket";
import {useSelector} from 'react-redux';
import { useLocation } from "react-router-dom";

const BannerAlert = (props) => {
    const { duration } = props;
    const [informationAlert, setInformationAlert] = useState("");
    const { userName } = useSelector(state => state.user);

    socket.on("newInformation", information => {
        if(information.type == "newGroup" && userName == information.owner) return;
        // if(information.type == "newChat" && locationPathName == "/chat/" + information.channelId) return;
        setInformationAlert(information.information)
    });

    return (
        <div className="banner">
            {informationAlert !== "" && <div
                style={{ animationDelay: duration + "s" }} 
                className="banner-alert"
            >
                <div className="banner-alert-shape">
                    <div className="banner-alert-informations">
                        <p>{informationAlert}</p>
                    </div>
                </div>
                <div 
                    style={{ animationDuration: duration + "s" }}
                    className="banner-alert-timer"
                ></div>
            </div>}
        </div>
    )
}

export default BannerAlert;