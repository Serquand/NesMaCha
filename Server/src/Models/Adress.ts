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
    }
}, {
    timestamps: false
})

export default Adress;