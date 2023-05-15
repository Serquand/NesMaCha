import User from "../../Models/User";
import UserChannel from "../../Models/UserChannel";
import { Op } from "sequelize";

const UserNotInChannel: (username: string, channelId: number) => Promise<boolean> = async (username: string, channelId: number): Promise<boolean> => {
    const userId = (await User.findOne({
        where: { pseudo: username }, 
        attributes: ["idUser"]
    }))?.dataValues.idUser;

    if(userId == null) return true;

    const channel = await UserChannel.findOne({
        where: { [Op.and]: [{ idUser: userId }, { idChannel: channelId }]}
    })

    return !channel;
}

export default UserNotInChannel;