import User from "../../Models/User";
import { Op } from "sequelize";

const getIdOfEveryone: (everyone: Array<string>) => Promise<Array<string>> = async (everyone: Array<string>): Promise<Array<string>> => {
    const resDb = await User.findAll({
        where: { pseudo: { [Op.or]: [everyone] } }, 
        attributes: ["idUser"]
    });

    const res = new Array<string>();
    for(let i = 0; i < resDb.length; i++) res.push(resDb[i].dataValues.idUser);

    return res;
}

export default getIdOfEveryone;