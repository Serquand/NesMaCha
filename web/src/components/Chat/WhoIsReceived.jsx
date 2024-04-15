import '../../styles/css/index.css';

const WhoIsReceived = (props) => {
    const { nameGroup, listPerson } = props;

    let displayName = nameGroup + " | ";
    for(let i = 0; i < listPerson.length; i++) displayName += listPerson[i].pseudo + ", ";
    displayName = displayName.slice(0, -2);

    return (
        <>
            <section className="who-is-received">
                <h3 className="who-is-received-name">{ displayName }</h3>
            </section>
        </>
    )
}

export default WhoIsReceived;