import AnnounceChoice from "./AnnounceChoice";
import CreateAnnounceChoice from "./CreateAnnounceChoice";
import Home from "../../assets/home.png";
import Others from "../../assets/Annonces.png";
import SelectChat from "../Chat/SelectChat";
import { useEffect, useState } from "react";

const SelectAnnounce = (props) => {
    const { listAnnounce } = props;
    const [waitingList, setWaitingList] = useState([]);
    const [othersAnnouncement, setOtherAnnouncement] = useState([]);

    useEffect(() => {
        setWaitingList(listAnnounce.waitingAnswer);
        setOtherAnnouncement(listAnnounce.otherCarPoolings);
    }, [listAnnounce]);

    const ourAnnonceInformations = {
        image: (<img src={Home} alt="Vos annonces" />), 
        name: "Vos annonces", 
        id: 0,
        unseenMessage: 0
    }

    const othersAnnounceInformations = {
        image: (<img src={Others} alt="Autres annonces" />), 
        name: "Autres annonces", 
        id: 0,
        unseenMessage: 0
    }

    const passengersAnnounceInformations = {
        image: (<img src={Others} alt="Passagers" />), 
        name: "Passagers", 
        id: 0,
        unseenMessage: 0
    }

    const waitingAnnounceInformations = {
        image: (<img src={Others} alt="En attente de réponse" />), 
        name: "En attente de réponse", 
        id: 0,
        unseenMessage: 0        
    }

    const changeToWaiting = announceId => {
        const announce = othersAnnouncement.filter(value => value.idCarPooling == announceId)[0];
        setOtherAnnouncement(othersAnnouncement.filter(value => value.idCarPooling !== announceId));
        setWaitingList([...waitingList, announce]);
    }   

    return (
        <section>
            {/* Création de l'annonce */}
            <CreateAnnounceChoice />

            {/* Liste nos annonces */}
            {listAnnounce.ourCarPoolings?.length ? (<>
                <SelectChat informations={ourAnnonceInformations} />
                {listAnnounce.ourCarPoolings?.map((announce, index) => (
                    <AnnounceChoice 
                        informations={announce} 
                        canApply={false}
                        canAnswer={false}
                        key={index} 
                    />
                ))}
            </>) : null}

            {/* Liste les annonces passagers */}
            {listAnnounce.passengerList?.length ? (<>
                <SelectChat informations={passengersAnnounceInformations} />
                {listAnnounce.passengerList?.map((announce, index) => (
                    <AnnounceChoice 
                        informations={announce} 
                        canApply={false}
                        canAnswer={false}
                        key={index} 
                    />
                ))}
            </>) : null}

            {/* Liste les annonces en attente de réponse */}
            {waitingList?.length ? (<>
                <SelectChat informations={waitingAnnounceInformations} />
                {waitingList?.map((announce, index) => (
                    <AnnounceChoice 
                        informations={announce} 
                        canApply={false}
                        canAnswer={false}
                        key={index} 
                    />
                ))}
            </>) : null}

            {/* Liste les autres annonces */}
            {othersAnnouncement?.length ? (<>
                <SelectChat informations={othersAnnounceInformations} />
                {othersAnnouncement?.map((announce, index) => (
                    <AnnounceChoice 
                        informations={announce} 
                        canApply={true}
                        canAnswer={false}
                        key={index} 
                        switchList={() => changeToWaiting(announce.idCarPooling)}
                    />
                ))}
            </>) : null}
        </section>
    )
}

export default SelectAnnounce;