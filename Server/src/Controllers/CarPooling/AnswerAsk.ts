import { Request, Response } from 'express'
import Passenger from '../../Models/Passenger';

const AnswerAsk = async (req: Request, res: Response) => {
    if(req.body.answer) {
        await Passenger.update(
            { passengerValidate: true }, 
            { where: { idPassenger: req.body.idAsk } }
        )
    } else {
        await Passenger.destroy({ where: { idPassenger: req.body.idAsk } })
    }

    return res.status(200).json({
        information: "Votre réponse a bien été prise en compte !"
    })
}

export default AnswerAsk;