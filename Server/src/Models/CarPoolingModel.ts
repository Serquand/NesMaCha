import { DataTypes } from "sequelize";
import sequelize from "./Connection";
import Adress from "./Adress";
import User from "./User";

const CarPoolingModel = sequelize.define("CarPooling", {
    idCarPooling: {
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey : true, 
    },

    driver: {
        type: DataTypes.UUID, 
        allowNull: false, 
        references: {
            model: User, 
            key: "idUser"
        },
    },

    from: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: {
            model: Adress, 
            key: "idAdress"
        }
    },

    to: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: {
            model: Adress, 
            key: "idAdress"
        }
    },

    dateDeparture: {
        type: DataTypes.STRING, 
        allowNull: false,
    },

    maxPassenger: {
        type: DataTypes.INTEGER,
        allowNull: false, 
    },

    currentPassenger: {
        type: DataTypes.INTEGER,
        allowNull: false, 
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false, 
    }
});

export default CarPoolingModel;