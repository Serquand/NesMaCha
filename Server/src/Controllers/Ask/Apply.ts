import { Request, Response } from 'express'
import Passenger from '../../Models/Passenger';
import User from '../../Models/User';

const Apply = async (req: Request, res: Response) => {
    if(!req.body.username) {
        return res.status(400).json({ information: "Woooops... Something went wrong !" })
    }
    
    const passenger = (await User.findOne({
        where: { pseudo: req.body.username }, 
    }))?.dataValues.idUser;

    if(!passenger) {
        return res.status(400).json({ information: "Woooops... Something went wrong !" })
    }

    await Passenger.create({ 
        passenger, 
        carPooling: req.body.idAnnounce 
    });

    return res.status(201).json({
        information: "We have successfully applied for this !"
    });
}

export default Apply;