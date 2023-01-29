import { RequestHandler, Request, Response } from "express"
import { verify } from "argon2";
import User from "../../Models/User"; 
import { Secret, sign } from "jsonwebtoken"
import { Op } from "sequelize";

const signIn : RequestHandler = async (req: Request, res: Response) => {
    const resDb = await User.findOne({
        attributes: ["password"],
        where: { 
            [Op.and]: [
                { pseudo: req.body.pseudo },
                { valid: true }
            ]
        }
    });

    if(resDb == null) {
        return res.status(400).json("Aucun compte n'a été trouvé !");
    }

    if(!verify(resDb.dataValues.password, req.body.password)) {
        return res.status(400).json("Informations incorrectes !");
    }

    const token = sign(req.body.pseudo, process.env.JWT_SECRET as Secret)

    return res.status(200).json({ token })
}

export default signIn;