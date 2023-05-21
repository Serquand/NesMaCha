// --------------- Libraries import ---------------

// --------------- Components import ---------------
import AnnounceChoice from "./AnnounceChoice";
import CreateAnnounceChoice from "./CreateAnnounceChoice";
import Home from "../../assets/home.png";
import Others from "../../assets/Annonces.png";
import SelectChat from "../Chat/SelectChat";


const SelectAnnounce = (props) => {
    const { listAnnounce } = props;
    

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

    return (
        <section>
            {/* Création de l'annonce */}
            <CreateAnnounceChoice/>

            {/* Liste nos annonces */}
            {listAnnounce.ourCarPoolings?.length ? (<>
                <SelectChat informations={ourAnnonceInformations} />
                {listAnnounce.ourCarPoolings?.map((announce, index) => (
                    <AnnounceChoice 
                        informations={announce} 
                        canApply={false}
                        key={index} 
                    />
                ))}
            </>) : null}

            {/* Liste les autres annonces */}
            {listAnnounce.otherCarPoolings?.length ? (<>
                <SelectChat informations={othersAnnounceInformations} />
                {listAnnounce.otherCarPoolings?.map((announce, index) => (
                    <AnnounceChoice 
                        informations={announce} 
                        canApply={true}
                        key={index} 
                    />
                ))}
            </>) : null}
        </section>
    )
}

export default SelectAnnounce;