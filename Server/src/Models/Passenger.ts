import { DataTypes } from "sequelize";
import sequelize from "./Connection";
import CarPoolingModel from "./CarPoolingModel";
import User from "./User";

const Passenger = sequelize.define("Passenger", {
    idPassenger: {
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true
    },

    passenger: {
        type: DataTypes.UUID, 
        references: {
            model: User, 
            key: "idUser"
        }
    },

    carPooling: {
        type: DataTypes.INTEGER, 
        references: {
            model: CarPoolingModel, 
            key: "idCarPooling"
        }
    }
}, {
    timestamps: false
});

export default Passenger;