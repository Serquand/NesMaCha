import { useState } from "react";
import "../../styles/css/index.css";
import { socket } from "../../Socket/socket";

const BannerAlert = (props) => {
    const { duration, information } = props;
    const [informationAlert, setInformationAlert] = useState("");

    socket.on("newInformation", information => {
        setInformationAlert(information.information)
    });

    return (
        <>
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
        </>
    )
}

export default BannerAlert;