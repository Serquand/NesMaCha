import { Request, Response, RequestHandler } from "express";
import { Op } from "sequelize";
import User from "../../Models/User";

const validAccount: RequestHandler = async (req: Request, res: Response) => {
    const resDb = await User.findOne({
        where: {
            [Op.and]: [
                { valid: false },
                { idUser: req.body.idUser },
                { tempPassword: req.body.code }
            ]   
        }
    });

    if(resDb == null) {
        return res.status(400).json({
            information: "Une erreur s'est produite !"
        })
    }

    await User.update({
        tempPassword: null,
        valid: true
    }, {
        where: { idUser: req.body.idUser }
    })

    return res.status(200).json({
        information: "Votre compte a été validé avec succès !"
    })
}

export default validAccount;