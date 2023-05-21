import { Request, Response } from 'express'
import Passenger from '../../Models/Passenger';
import { Op } from 'sequelize';
import CarPoolingModel from '../../Models/CarPoolingModel';
import User from '../../Models/User';

const ListAsk = async (req: Request, res: Response) => {
    console.log(req.params.username);

    const userId = (await User.findOne({
        where: { pseudo: req.params.username }, 
        attributes: ["idUser"]
    }))?.dataValues.idUser;

    if(!userId) return res.status(400).json({ information: "Wooops... Something went wrong !" });

    const tempListAsk = (await Passenger.findAll({
        where: { passengerValidate: false }
    }));

    console.log(tempListAsk);

    const ourAnnounce = (await CarPoolingModel.findAll({
        where: { driver: userId }
    }));

    console.log(ourAnnounce);

    for(let i = 0; i < ourAnnounce.length; i++) {
        for(let j = 0; j < tempListAsk.length; j++) {
            
        }
    }
    

    return res.status(300).json({ information: "We are working on that !" })
}

export default ListAsk;