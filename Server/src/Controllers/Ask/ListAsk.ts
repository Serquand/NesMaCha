import { Request, Response } from 'express'
import Passenger from '../../Models/Passenger';
import { Op } from 'sequelize';
import CarPoolingModel from '../../Models/CarPoolingModel';
import User from '../../Models/User';
import Adress from '../../Models/Adress';

const ListAsk = async (req: Request, res: Response) => {
    const list = new Array();
    // Fetch our userId
    const userId = (await User.findOne({
        where: { pseudo: req.params.username }, 
        attributes: ["idUser"]
    }))?.dataValues.idUser;

    // Get all our annoucement
    const ourAnnounce = (await CarPoolingModel.findAll({ 
        where: { 
            [Op.and]: [
                { driver: userId },
                { status: "Incoming" }
            ]   
        }
    }));
    const ourAnnounceIds = new Array<Number>();
    

    // Generate a list of carpooling's id
    for(let i = 0; i < ourAnnounce.length; i++) ourAnnounceIds.push(ourAnnounce[i].dataValues.idCarPooling);
    if(ourAnnounceIds.length == 0) return res.status(200).json({ list: [] })
    

    // Fetch all ask 
    const allAsk = (await Passenger.findAll({
        where: {
            carPooling: { [Op.or]: ourAnnounceIds },
        }
    }));
    if(allAsk.length == 0) return res.status(200).json({ list: [] });
    
    // Get all adress
    const allAdress = (await Adress.findAll());

    for(let i = 0; i < allAsk.length; i++) {
        const pseudoApplier = (await User.findOne({
            where: { idUser: allAsk[i].dataValues.passenger },
            attributes: ["pseudo"]
        }))?.dataValues.pseudo;
                    
        const currentTrip = ourAnnounce.filter(value => value.dataValues.idCarPooling === allAsk[i].dataValues.carPooling)[0].dataValues as any;        

        const from = {...(allAdress.filter(value => value.dataValues.idAdress == currentTrip.from))[0].dataValues as any};
        const to = {...(allAdress.filter(value => value.dataValues.idAdress == currentTrip.to))[0].dataValues as any};

        const fromInfo = {
            x: from.xCoordinate, 
            y: from.yCoordinate, 
        }, toInfo = {
            x: to.xCoordinate, 
            y: to.yCoordinate, 
        }
        
        list.push({
            dateDeparture: currentTrip.dateDeparture,
            driver: currentTrip.driver,
            from: fromInfo, 
            to: toInfo,
            maxPlace: currentTrip.maxPassenger,
            currentPassenger: currentTrip.currentPassenger,
            idCarPooling: currentTrip.idCarPooling,                
            pseudoApplier
        })
    }

    return res.status(200).json({list})
}

export default ListAsk;