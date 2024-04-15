import { DataTypes } from "sequelize";
import sequelize from "./Connection";
import User from "./User";

const Channel = sequelize.define("Channel", {
    idChannel: {
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true, 
        allowNull: false, 
        unique: true
    },

    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    owner: {
        type: DataTypes.UUID, 
        allowNull: false, 
        references: {
            model: User, 
            key: "idUser"
        }
    }
},{
    timestamps: false,
    modelName: "Channel",
    tableName: 'Channels',
});

export default Channel;