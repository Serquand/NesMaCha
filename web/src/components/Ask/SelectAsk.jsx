import { useEffect, useState } from "react";
import AnnounceChoice from "../Announce/AnnounceChoice";

const SelectAsk = (props) => {
    const { listAsk } = props;
    const [ask, setAsk] = useState([]);

    useEffect(() => setAsk(listAsk), [listAsk]);

    const removeFromList = (askId) => setAsk(ask.filter(value => askId != value.idAsk));

    return (
        <section>
            {ask?.length ? (<>
                {ask.map((a, index) => (
                    <AnnounceChoice 
                        informations={a} 
                        canApply={false}
                        canAnswer={true}
                        key={index} 
                        removeFromList={() => removeFromList(a.idAsk)}
                    />
                ))}
            </>) : (<>
                <p>Vous n'avez aucune demande !</p>
            </>)}
        </section>
    )

}

export default SelectAsk