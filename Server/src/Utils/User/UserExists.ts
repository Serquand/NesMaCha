import { Op } from "sequelize";
import User from "../../Models/User"

const userExists: (email: String, pseudo: String) => Promise<Boolean> = async (email: String, pseudo: String): Promise<Boolean> => {
    const user = await User.findOne({ 
        where: { [Op.or]: [{ email }, { pseudo }] } 
    });

    return user !== null;
}

export default userExists;