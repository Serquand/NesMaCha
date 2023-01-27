import { DataTypes } from "sequelize";
import sequelize from "./Connection";
import User from "./User";
import Channel from "./Channel";

const Message = sequelize.define("Message", {
    sender: {
        type: DataTypes.UUID, 
        references: {
            model: User, 
            key: "idUser"
        },
        allowNull: false,
    },

    dateMessage: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
    },

    channel: {
        type: DataTypes.INTEGER, 
        references: {
            model: Channel, 
            key: "idChannel"
        },
        allowNull: false,
    },

    content: {
        type: DataTypes.TEXT,
        allowNull: false, 
    },

    idMessage: {
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true, 
        allowNull: false, 
        unique: true
    }
},{
    timestamps: false,
    modelName: "Message",
    tableName: 'Messages',
});

export default Message;