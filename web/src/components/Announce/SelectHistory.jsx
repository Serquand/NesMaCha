import AnnounceChoice from "./AnnounceChoice";

const SelectHistory = (props) => {
    const {history} = props;
    console.log(history);

    return (
        <section>
            {history?.length ? (<>
                {history.map((history, index) => (
                    <AnnounceChoice 
                        informations={history} 
                        canApply={false}
                        canAnswer={false}
                        key={index} 
                    />
                ))}
            </>) : null}
        </section>
    )
}

export default SelectHistory;