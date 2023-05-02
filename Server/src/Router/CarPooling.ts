import express from "express";
import getCities from "../Controllers/CarPooling/GetCities";

const carPooling = express.Router();

carPooling.get("/citiesByZip/:zipCode", getCities);

export default carPooling;