import { DataTypes } from "sequelize";
import sequelize from "./Connection";

const Adress = sequelize.define("Adress", {
    idAdress: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, 
    },

    xCoordinate: {
        type: DataTypes.FLOAT,
        allowNull: false, 
    },

    yCoordinate: {
        type: DataTypes.FLOAT,
        allowNull: false,    
    },

    name: {
        type: DataTypes.STRING, 
        allowNull: false, 
    },

    city: {
        type: DataTypes.STRING, 
        allowNull: false, 
    },

    zipCode: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
    },
})

export default Adress;