import "../../styles/css/index.css";
import { useNavigate } from "react-router-dom";

const AnnounceChoice = (props) => {
    const { informations } = props;

    // informations.from.diplay = `(${informations.from.x}; ${informations.from.x})`;
    // informations.to.diplay = `(${informations.to.x}; ${informations.to.x})`;
    informations.from.diplay = "30-32 avenue de la République";
    informations.to.diplay = "30-32 avenue de la République";

    informations.date = new Date(parseInt(informations.dateDeparture))
    const date = new Date(1684619827468);
    const dateDisplayed = date.getDate().toString().padStart(2, "0") + "/" + (date.getMonth() + 1).toString().padStart(2, "0") + "/" + date.getFullYear() + " - " + date.getHours().toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0");

    const navigate = useNavigate();

    const goToTheAnnouncementView = () => {
        console.log(informations.idCarPooling);
        navigate("/announce/" + informations.idCarPooling);
    }

    return (
        <article 
            className="announce-choice"
            onClick={goToTheAnnouncementView}
        >
            <h5 className="announce-choice-places">
                {informations.from.diplay}<br />-&gt;<br />{informations.to.diplay}
            </h5>
            <p>
                <span>{dateDisplayed}</span> |&nbsp;
                <span>{informations.maxPlace}/{informations.currentPassenger}</span>
            </p>
        </article>
    );
}

export default AnnounceChoice;