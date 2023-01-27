import { DataTypes } from "sequelize";
import sequelize from "./Connection";
import User from "./User";
import Channel from "./Channel";

const UserChannel = sequelize.define("UserChannel", {
    idUserChannel: {
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true, 
        allowNull: false, 
        unique: true
    },

    idChannel: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: Channel, 
            key: "idChannel"
        },
    },

    idUser: {
        type: DataTypes.UUID, 
        allowNull: false, 
        references: {
            model: User, 
            key: "idUser"
        },
    },

    dateLastSeen: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
    }
},{
    timestamps: false,
    modelName: "UserChannel",
    tableName: 'UserChannels',
});

export default UserChannel;