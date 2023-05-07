import { useEffect, useState } from "react";
import "../../styles/css/index.css";

const BannerAlert = (props) => {
    const { duration, information } = props;
    const [isVisible, setIsVisible] = useState(true);

    

    return (
        <div
            style={{ animationDelay: duration + "s" }} 
            className="banner-alert"
        >
            <div className="banner-alert-shape">
                <div className="banner-alert-informations">
                    <p>{information}</p>
                </div>
            </div>
            <div 
                style={{ animationDuration: duration + "s" }}
                className="banner-alert-timer"
            ></div>
        </div>
    )
}

export default BannerAlert;