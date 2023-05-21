// --------------- Libraries import ---------------

// --------------- Components import ---------------
import AnnounceChoice from "./AnnounceChoice";
import CreateAnnounceChoice from "./CreateAnnounceChoice";


const SelectAnnounce = (props) => {
    const { listAnnounce } = props;
    

    return (
        <section>
            {/* Création de l'annonce */}
            <CreateAnnounceChoice/>

            {/* Liste toutes les annonces */}
            {listAnnounce.map((announce, index) => (
                <AnnounceChoice 
                    informations={announce} 
                    key={index} 
                />
            ))}
        </section>
    )
}

export default SelectAnnounce;