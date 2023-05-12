import Modal from "../General/Modal";

const CreateChat = (props) => {
    const { endCreation } = props;

    const submitForm = () => {

    }

    return (
        <>
            <Modal
                createAction={submitForm} 
                closeModal={endCreation}
                nameButton="Créer le chat"
                titleModal="Créer le chat"
            >
                <p>Créer le groupe</p>
            </Modal>
        </>
    )
}   

export default CreateChat;