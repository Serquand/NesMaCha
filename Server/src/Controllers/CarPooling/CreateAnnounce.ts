import { Request, Response } from 'express'
import Adress from '../../Models/Adress';
import CarPoolingModel from '../../Models/CarPoolingModel';
import User from "../../Models/User";

const CreateAnnounce = async (req: Request, res: Response) => {
    const driver = (await User.findOne({
        where: { pseudo: req.body.pseudo },
        attributes: ["idUser"]
    }))?.dataValues.idUser;

    if(driver == null) {
        return res.status(200).json({
            information: "Le nouveau covoiturage a été créé avec succès !"
        });
    }

    const from = (await Adress.create({ 
        xCoordinate: req.body.from.x, 
        yCoordinate: req.body.from.y 
    })).dataValues.idAdress;

    const to = (await Adress.create({ 
        xCoordinate: req.body.to.x, 
        yCoordinate: req.body.to.y 
    })).dataValues.idAdress;

    await CarPoolingModel.create({
        driver, 
        dateDeparture: req.body.timeStampDepart,
        maxPassenger: req.body.numberPlace,
        from,
        to
    });
    

    res.status(200).json({
        information: "Le nouveau covoiturage a été créé avec succès !"
    });
}

export default CreateAnnounce;