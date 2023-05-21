import Modal from "../General/Modal";
import { useRef, useState } from "react";
import {createGroup} from "../../Socket/socket";
import informations from "../../../informations.json";
import Loupe from "../../assets/loupe.png";
import CreateChatMember from "./CreateChatMember";

const CreateChat = (props) => {
    const { endCreation } = props;
    
    const groupNameRef = useRef();
    const searchUserRef = useRef();
    const [listUserSearched, setListUserSearched] = useState([]);
    const [listUserSelected, setListUserSelected] = useState([]);

    const submitForm = async () => {
        const groupName = groupNameRef.current.value;
        createGroup(groupName, listUserSelected);
        endCreation();
    }

    const searchUser = async () => {
        // const userSearched = searchUserRef.current.value;
        // const res = await fetch(informations.urlAPI + "/chat/searchUser/" + userSearched);
        // const data = await res.json();
        // setListUserSearched(data);
        setListUserSearched(["Mehdi", "Serquand", "Mélissa", "Marion", "Jules"]);
    }   

    const toggleMember = (username) => {
        if(listUserSelected.includes(username)) {
            setListUserSelected(listUserSelected.filter(member => member != username))
        } else {
            setListUserSelected([...listUserSelected, username]);
        }
    }

    return (
        <>
            <Modal
                createAction={submitForm} 
                closeModal={endCreation}
                nameButton="Créer le chat"
                titleModal="Créer le chat"
            >
                <div className="creation-groupe">
                    <div className="creation-groupe-block">
                        <label className="creation-groupe-label creation-groupe-name-label">Nom du groupe</label>
                        <input 
                            className="creation-groupe-name creation-groupe-input" 
                            type="text" 
                            ref={groupNameRef}
                        />
                    </div>
                    
                    {listUserSelected.length != 0 && <div className="creation-group-block">
                        <h4>Utilisateurs du groupe</h4>
                        {listUserSelected.map((member, index) => 
                            <CreateChatMember 
                                toggleMember={() => toggleMember(member)}
                                memberName={member}
                                userSelected={listUserSelected.includes(member)}
                                key={index} 
                            />
                        )} 
                    </div>}

                    <div className="creation-groupe-block member-search">
                        <label className="creation-groupe-block-label member-search-label">Chercher une personne</label>
                        <div className="member-search-content">
                            <div className="member-search-input-container">
                                <input 
                                    type="text" 
                                    ref={searchUserRef}
                                    className="creation-groupe-search-user creation-groupe-input"
                                />
                                <button onClick={searchUser}>
                                    <img src={Loupe} alt="Chercher" />
                                </button>
                            </div>

                            <div className="member-search-result">
                                {listUserSearched.map((member, index) => 
                                    <CreateChatMember 
                                        toggleMember={() => toggleMember(member)}
                                        memberName={member}
                                        userSelected={listUserSelected.includes(member)}
                                        key={index} 
                                    />
                                )} 
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}   

export default CreateChat;