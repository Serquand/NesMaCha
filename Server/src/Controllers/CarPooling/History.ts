import { Request, Response } from 'express'
import CarPoolingModel from '../../Models/CarPoolingModel';
import Passenger from '../../Models/Passenger';
import Adress from '../../Models/Adress';
import User from '../../Models/User';
import { Op } from 'sequelize';
import { CarPooling } from '../../Types/CarPooling';

const History = async (req: Request, res: Response) => {
    const allAdress = await Adress.findAll();
    const list = new Array<CarPooling>();
    const userId = (await User.findOne({
        where: { pseudo: req.params.username }
    }))?.dataValues.idUser;

    if(!userId) {
        return res.status(400).json({ information: "Wooops.... Something went wrong !" });
    }

    const history = await CarPoolingModel.findAll({
        where: {
            [Op.and]: [
                { status: { [Op.or]: ["Done", "Cancelled"] }}, 
                { driver: userId }
            ]
        }
    });

    for(let i = 0; i < history.length; i++) {
        const from = (allAdress.filter(value => value.dataValues.idAdress == history[i].dataValues.from))[0].dataValues;
        const to = (allAdress.filter(value => value.dataValues.idAdress == history[i].dataValues.to))[0].dataValues;
        const infoCarPoolings: CarPooling = {
            dateDeparture: history[i].dataValues.dateDeparture,
            driver: history[i].dataValues.driver, 
            from: { x: from.xCoordinate, y:  from.yCoordinate },
            maxPlace: history[i].dataValues.maxPassenger,
            to: { x: to.xCoordinate,y:  to.yCoordinate },
            currentPassenger: history[i].dataValues.currentPassenger,
            idCarPooling: history[i].dataValues.idCarPooling
        }

        list.push(infoCarPoolings);
    }

    return res.status(200).json({ list });
}

export default History;