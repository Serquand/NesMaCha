import { Request, Response } from 'express'
import Passenger from '../../Models/Passenger';
import CarPoolingModel from '../../Models/CarPoolingModel';

const AnswerAsk = async (req: Request, res: Response) => {
    if(req.body.answer) {
        await Passenger.update(
            { passengerValidate: true }, 
            { where: { idPassenger: req.body.idAsk } }
        )

        const idCarPooling = (await Passenger.findOne({
            where: { idPassenger: req.body.idAsk }
        }))?.dataValues.carPooling;

        await CarPoolingModel.increment("currentPassenger", {
            by: 1, 
            where: { idCarPooling }
        })
    } else {
        await Passenger.destroy({ where: { idPassenger: req.body.idAsk } })
    }

    return res.status(200).json({
        information: "Votre réponse a bien été prise en compte !"
    })
}

export default AnswerAsk;