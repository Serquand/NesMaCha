import Modal from "../General/Modal";
import { useRef, useState } from "react";
import {createGroup} from "../../Socket/socket";
import informations from "../../../informations.json";

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
        const userSearched = searchUserRef.current.value;
        const res = await fetch(informations.urlAPI + "/chat/searchUser/" + userSearched);
        const data = await res.json();
        setListUserSearched(data);
    }   

    const updateSearched = (userSearched) => {
        if(listUserSelected.includes(userSearched)) return;
        setListUserSelected([...listUserSelected, userSearched]);
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

                    <div className="creation-groupe-block">
                        <label className="creation-groupe-block-label member-search-label">Chercher une personne</label>
                        <div>
                            <input 
                                type="text" 
                                ref={searchUserRef}
                                className="creation-groupe-search-user creation-groupe-input"
                            />
                            <button onClick={searchUser}>Chercher</button>
                        </div>
                    </div>
                </div>

                <div>
                    {listUserSearched.map((userSearched, index) => (
                        <label key={index} htmlFor={'toggle-' + userSearched}>
                            <input 
                                onChange={() => updateSearched(userSearched)} 
                                type="checkbox" 
                                name="" 
                                id={'toggle-' + userSearched} 
                                checked={listUserSelected.includes(userSearched)}
                            />
                            <p>{ userSearched }</p>
                        </label>
                    ))}
                </div>


            </Modal>
        </>
    )
}   

export default CreateChat;