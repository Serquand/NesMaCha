import express from "express";
import getCities from "../Controllers/CarPooling/GetCities";
import isAuth from "../Middlewares/Login/IsAuth";
import checkInformationsForCreatingAnnounce from "../Middlewares/CarPooling/CheckInformationsForCreatingAnnounce";
import createAnnounce from "../Controllers/CarPooling/CreateAnnounce";
import ListCarPooling from "../Controllers/CarPooling/ListCarPooling";
import getAllInfo from "../Controllers/CarPooling/GetAllInfo";

const carPooling = express.Router();

carPooling.get("/:idCarPooling", getAllInfo);
carPooling.get("/citiesByZip/:zipCode", getCities);
carPooling.get("/list/:pseudo", ListCarPooling);
carPooling.post("/create", isAuth, checkInformationsForCreatingAnnounce, createAnnounce);

export default carPooling;