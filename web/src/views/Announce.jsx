import "../styles/css/index.css";
import "../styles/css/test.css";

import informations from "../../informations.json";
// --------------- Libraries import ---------------
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// --------------- Components import ---------------
import Loader from "../components/General/Loader";
import Modal from "../components/General/Modal";
import InputField from "../components/General/InputField";
// ----------------- Images import -----------------
import Address from "../assets/address.png";
import City from "../assets/city.png";
import ZipCode from "../assets/zip-code.png";
import Seat from "../assets/seat.png";
import Calendar from "../assets/calendar.png";
import Clock from "../assets/clock.png";

import { toggleCreateAnnounce } from "../store/Announce";


const Announce = (props) => {
    const { creation } = useSelector(state => state.announce)
    const { userName } = useSelector(state => state.user);
    const { userToken } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const depAddressRef = useRef();
    const arrAddressRef = useRef();
    const depCityRef = useRef();
    const arrCityRef = useRef();
    const depZipRef = useRef();
    const arrZipRef = useRef();
    const seatsRef = useRef();
    const dateRef = useRef();
    const timeRef = useRef();


    const formSubmit = async () => {
        // Put the loader
        setLoading(true);

        const departure = {
            address: depAddressRef.current.value,
            city: depCityRef.current.value,
            zip: depZipRef.current.value
        }
        const arrival = {
            address: arrAddressRef.current.value,
            city: arrCityRef.current.value,
            zip: arrZipRef.current.value
        }
        const date = {
            date: dateRef.current.value,
            time: timeRef.current.value
        }
        const seat = seatsRef.current.value;

        let announce_data = {
            "from": {
                x: 0,
                y: 0
            },
            "to": {
                x: 0,
                y: 0
            },
            "numberPlace": 0,
            "timeStampDepart": 0,
            "pseudo": userName
        }
        let requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        };
    
    
        if(departure.address == "" || arrival.address == "") {
            setLoading(false);
            return;
        }

        //------------------------ Departure ------------------------
        // Generate the request
        let res = await fetch( (informations.addrGouvAPI + "/?q=" + departure.address + "&postcode=" + departure.zip), requestOptions );
        let data = await res.json();

        if(res.status != 200) {
            setLoading(false);
            return;
        }
        
        if(data.features[0].properties.type != "housenumber" && data.features[0].properties.type != "locality") {
            setLoading(false);
            return;
        }

        if((departure.city).toLowerCase() != (data.features[0].properties.city).toLowerCase()) {
            setLoading(false);
            return;
        }

        announce_data.from.x = data.features[0].geometry.coordinates[1]
        announce_data.from.y = data.features[0].geometry.coordinates[0]

        //------------------------ Arrival ------------------------
        // Generate the request
        res = await fetch( (informations.addrGouvAPI + "/?q=" + arrival.address + "&postcode=" + arrival.zip), requestOptions );
        data = await res.json();

        if(res.status != 200) {
            setLoading(false);
            return;
        }
        
        if(data.features[0].properties.type != "housenumber" && data.features[0].properties.type != "locality") {
            setLoading(false);
            return;
        }

        if((arrival.city).toLowerCase() != (data.features[0].properties.city).toLowerCase()) {
            setLoading(false);
            return;
        }

        announce_data.to.x = data.features[0].geometry.coordinates[1]
        announce_data.to.y = data.features[0].geometry.coordinates[0]

        //----------------- Verify other entered informations -----------------
        let entered_date = new Date(date.date + " " + date.time);

        if(entered_date.getTime() < Date.now()) {
            setLoading(false);
            return;
        }

        if (parseInt(seat) == NaN) {
            setLoading(false);
            return;
        }

        if(parseInt(seat) <= 0) {
            setLoading(false);
            return;
        }

        announce_data.timeStampDepart = entered_date.getTime()
        announce_data.numberPlace = parseInt(seat);

        // Change fetch options
        requestOptions.method = "POST";
        requestOptions.headers["Authorization"] = "Bearer " + userToken
        requestOptions["body"] = JSON.stringify(announce_data)

        console.log(requestOptions);

        // Generate the request
        res = await fetch(informations.urlAPI + "/carpooling/create", requestOptions);
        data = await res.json();
        
        setLoading(false);
        
        if(res.status != 200) {
            // Display ERROR banner
            return;
        }

        dispatch(toggleCreateAnnounce())
        // Display SUCCESS banner
    }

    const input_data = {
        "departure address": {
            img: {
                icon: Address,
                alt: "address icon"
            },
            input: {
                id: "dep-address",
                placeholder: "Adresse de départ",
                ref: depAddressRef
            }
        },
        "arrival address": {
            img: {
                icon: Address,
                alt: "address icon"
            },
            input: {
                id: "arr-address",
                placeholder: "Adresse d'arrivée",
                ref: arrAddressRef
            }
        },
        "departure city": {
            img: {
                icon: City,
                alt: "city icon"
            },
            input: {
                id: "departure-city",
                placeholder: "Ville de départ",
                ref: depCityRef
            }
        },
        "arrival city": {
            img: {
                icon: City,
                alt: "city icon"
            },
            input: {
                id: "arrival-city",
                placeholder: "Ville d'arrivée",
                ref: arrCityRef
            }
        },
        "departure zip code": {
            img: {
                icon: ZipCode,
                alt: "zip code icon"
            },
            input: {
                id: "dep-zip-code",
                placeholder: "Code postal de départ",
                ref: depZipRef
            }
        },
        "arrival zip code": {
            img: {
                icon: ZipCode,
                alt: "zip code icon"
            },
            input: {
                id: "arr-zip-code",
                placeholder: "Code postal d'arrivée",
                ref: arrZipRef
            }
        },
        "seats": {
            img: {
                icon: Seat,
                alt: "free seats icon"
            },
            input: {
                id: "seats",
                placeholder: "Places libres",
                type: "number",
                min: 1,
                ref: seatsRef
            }
        },
        "date": {
            img: {
                icon: Calendar,
                alt: "calendar icon"
            },
            input: {
                id: "date",
                placeholder: "Date de départ",
                type: "date",
                min: 1,
                ref: dateRef
            }
        },
        "time": {
            img: {
                icon: Clock,
                alt: "clock icon"
            },
            input: {
                id: "time",
                placeholder: "Places libres",
                type: "time",
                min: 1,
                ref: timeRef
            }
        }
    }

    const announce_form = <div
    onSubmit={formSubmit}
        className="create-announce"
    >
        <div className="col-wrapper">
            <InputField
                img={input_data["departure address"].img}
                input={input_data["departure address"].input}
            >
            </InputField>

            <div className="row-wrapper">
                <InputField
                    img={input_data["departure city"].img}
                    input={input_data["departure city"].input}
                    className="grow-input"
                >
                </InputField>

                <InputField
                    img={input_data["departure zip code"].img}
                    input={input_data["departure zip code"].input}
                    className="shrink-input"
                >
                </InputField>
            </div>
        </div>

        <div className="horiz-separator"></div>

        <div className="col-wrapper">
            <InputField
                img={input_data["arrival address"].img}
                input={input_data["arrival address"].input}
            >
            </InputField>

            <div className="row-wrapper">
                <InputField
                    img={input_data["arrival city"].img}
                    input={input_data["arrival city"].input}
                    className="grow-input"
                >
                </InputField>

                <InputField
                    img={input_data["arrival zip code"].img}
                    input={input_data["arrival zip code"].input}
                    className="shrink-input"
                >
                </InputField>
            </div>
        </div>

        <div className="horiz-separator"></div>
        
        <div className="row-wrapper">
            <div className="col-wrapper">
                <span>Date de départ :</span>

                <InputField
                img={input_data["date"].img}
                input={input_data["date"].input}
            >
            </InputField>
            </div>

            <div className="col-wrapper">
                <span>Heure de départ :</span>

                <InputField
                    img={input_data["time"].img}
                    input={input_data["time"].input}
                    className="shrink-input"
                >
                </InputField>
            </div>
        </div>

        <InputField
            img={input_data["seats"].img}
            input={input_data["seats"].input}
        >
        </InputField>
    </div>


    return (
        <div className="announce-body">
            {creation && <Modal
                titleModal="Créer une annonce"
                nameButton="Créer"
                createAction={formSubmit}
                closeModal={() => dispatch(toggleCreateAnnounce())}
            >
                {announce_form}
            </Modal>}
            
            {loading && <Loader />}
        </div>
    )
}

export default Announce;