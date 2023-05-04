import SelectChat from "./SelectChat";

const ListSelectChat = (props) => {
    const { informations } = props;

    return (
        <ul>
            {informations.map((information, index) => (
                <li key={index}>
                    <SelectChat informations={information} />
                </li>
            ))}
        </ul>
    )

}

export default ListSelectChat;