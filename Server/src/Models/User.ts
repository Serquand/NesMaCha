import { DataTypes } from "sequelize";
import sequelize from "./Connection";

const User = sequelize.define("User", {
    idUser: {
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true, 
        validate: {
            isEmail: true
        }
    },

    name: {
        type: DataTypes.STRING(100), 
        allowNull: false, 
    }, 

    lastName: {
        type: DataTypes.STRING(100), 
        allowNull: false, 
    }, 

    password: {
        type: DataTypes.STRING, 
        allowNull: false
    }, 
    
    valid: {
        type: DataTypes.BOOLEAN, 
        allowNull: false, 
    }
},{
    timestamps: false,
    modelName: "User",
    tableName: 'Users',
});

export default User;