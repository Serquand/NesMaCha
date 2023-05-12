import SelectChat from "./SelectChat";

const ListSelectChat = (props) => {
    const { informations, startCreation } = props;

    const createInformations = {
        image: "+", 
        name: "Créer un chat", 
        id: 0,
        unseenMessage: 0
    }

    return (
        <ul>
            <div onClick={startCreation}>
                <SelectChat informations={createInformations} />
            </div>
            {informations.map((information, index) => (
                <li key={index}>
                    <SelectChat informations={information} />
                </li>
            ))}
        </ul>
    )

}

export default ListSelectChat;