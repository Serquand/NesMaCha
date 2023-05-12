import { Request, Response, RequestHandler } from "express";
import { Op } from "sequelize";
import User from "../../Models/User";
import { Secret, sign } from "jsonwebtoken";

const validAccount: RequestHandler = async (req: Request, res: Response) => {
    const resDb = await User.findOne({
        where: {
            [Op.and]: [
                { valid: false },
                { pseudo: req.body.pseudo },
                { tempPassword: req.body.code }
            ]   
        }
    });

    if(resDb == null) {
        return res.status(400).json({information: "Une erreur s'est produite !"})
    }

    await User.update({
        tempPassword: null,
        valid: true
    }, { where: { pseudo: req.body.pseudo } })

    const token = sign(req.body.pseudo, process.env.JWT_SECRET as Secret)

    return res.status(200).json({token, information: "Votre compte a été validé avec succès !"})
}

export default validAccount;