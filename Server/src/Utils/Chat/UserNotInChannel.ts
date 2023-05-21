import User from "../../Models/User";
import UserChannel from "../../Models/UserChannel";
import { Op } from "sequelize";

const UserNotInChannel: (userId: string, channelId: number) => Promise<boolean> = async (userId: string, channelId: number): Promise<boolean> => {
    if(userId == null) return true;

    const channel = await UserChannel.findOne({
        where: { [Op.and]: [{ idUser: userId }, { idChannel: channelId }]}
    })

    return !channel;
}

export default UserNotInChannel;