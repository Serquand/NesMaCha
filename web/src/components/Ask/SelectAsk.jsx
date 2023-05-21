import AnnounceChoice from "../Announce/AnnounceChoice";

const SelectAsk = (props) => {
    const { listAsk } = props;
    console.log(listAsk);

    return (
        <section>
            {listAsk?.length ? (<>
                {listAsk.map((ask, index) => (
                    <AnnounceChoice 
                        informations={ask} 
                        canApply={false}
                        canAnswer={true}
                        key={index} 
                    />
                ))}
            </>) : (<>
                <p>Vous n'avez aucune demande !</p>
            </>)}
        </section>
    )

}

export default SelectAsk