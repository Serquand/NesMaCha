import { Socket } from "socket.io";
import User from "../../Models/User";
import UserChannel from "../../Models/UserChannel";

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
        socket.join("room - " + channel.dataValues.idChannel);
    }
}