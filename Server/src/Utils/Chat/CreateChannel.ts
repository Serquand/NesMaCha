import Channel from "../../Models/Channel";
import User from "../../Models/User";

const createChannel: (information: any, pseudo: string) => Promise<number> = async (information: any, pseudo: string): Promise<number> => {
    const idOwner = (await User.findOne({ 
        where: { pseudo }, 
        attributes: ["idUser"]
    }))?.dataValues.idUser;

    const res = await Channel.create({ 
        name: information.groupName, 
        owner: idOwner
    });

    return res.dataValues.idChannel;
}   

export default createChannel;