import "../styles/css/index.css";
import informations from "../../informations.json";
import { useState } from "react";
import Loader from "../components/General/Loader";
import { useSelector } from "react-redux";
import Modal from "../components/General/Modal";

const CreateAnnounce = () => {
    const { userToken } = useSelector(state => state.user);
    const [informationModal, setInformationModal] = useState('');
    const [loader, setLoader] = useState(false);
    const [showInformationsModal, setShowInformationsModal] = useState(false);
    const [titleInformationsModal, setTitleInformationsModal] = useState('');
    const [from, setFrom] = useState({});
    const [to, setTo] = useState({});
    const [maxSeat, setMaxSeat] = useState({});
    const [date, setDate] = useState('');
    const [hour, setHour] = useState('');

    const closeModal = () => setShowInformationsModal(false);

    const submitCreation = async () => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
                "Authorization": "Bearer " + userToken
            }, 
            body: JSON.stringify({ from, to, maxSeat, date, hour })
        };

        setLoader(true);
        const res = await fetch(informations.urlAPI + "/carPooling/create", requestOptions);
        const data = await res.json();
        setTitleInformationsModal(res.status == 201 ? "Succès" : "Erreur");
        setInformationModal(data);
        setLoader(false);
        setShowInformationsModal(true);
    }

    return (
        <>
            <form
                onSubmit={submitCreation}
                className="create-announce"
            >

            </form>
            {loader && <Loader />}
            {showInformationsModal && <Modal 
                titleModal={titleInformationsModal}
                nameButton="Fermer"
                createAction={closeModal}
                closeModal={closeModal}
            >
                <p>{informationModal}</p> 
            </Modal>}
        </>
    )
}

export default CreateAnnounce;