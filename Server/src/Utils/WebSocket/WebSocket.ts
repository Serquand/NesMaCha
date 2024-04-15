import { Socket } from "socket.io";
import User from "../../Models/User";
import UserChannel from "../../Models/UserChannel";
import { Op } from "sequelize";

export const socketInit: (username: string, socket: Socket) => Promise<void> = async (username: string, socket: Socket): Promise<void> => {
    const idUser = (await User.findOne({
        where: { pseudo: username },
        attributes: ["idUser"]
    }))?.dataValues.idUser;

    if(idUser == null) return;

    const channels = await UserChannel.findAll({
        where: { idUser }, 
        attributes: ["idChannel"]
    });

    for (const channel of channels) {
        socket.join("channel - " + channel.dataValues.idChannel);
    }

    socket.join("user - " + idUser);
}

export const allUsersDontExist = async (listUser: Array<string>) => {
    const { count } = await User.findAndCountAll({
        where: {
            pseudo: { [Op.or]: listUser }
        }
    });
    

    return count !== listUser.length;
}