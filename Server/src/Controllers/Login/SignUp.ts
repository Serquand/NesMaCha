import { RequestHandler, Request, Response } from "express"
import { hash } from "argon2";
import User from "../../Models/User";
import transporter from "../../Services/MailTransporter";
import { SendMailOptions } from "nodemailer";
import { v4 } from "uuid";
import signUpConfirmation from "../../Utils/Mail/SignUpConfirmation";
import { Op } from "sequelize";

/*
    - Création de l'utilisateur en db
    - Envoie du mail de confirmation
    - Si aucune confirmation, suppression de l'utilsateur en DB 15 min plus tard.
*/
const signUp: RequestHandler = async (req: Request, res: Response) => {
    const password = await hash(req.body.password);
    const tempCode = v4().slice(0, 6); 

    // Création de l'utilisateur en db
    await User.create({
        email: req.body.email,
        name: req.body.name,
        lastName: req.body.lastName,
        password,
        tempPassword: tempCode,
        valid: false
    });

    // Si aucune confirmation, suppression de l'utilisateur en DB 15 min plus tard.
    setTimeout(() => {
        User.destroy({
            where: {
                [Op.and]: [
                    { email: req.body.email },
                    { valid: false }
                ]
            }
        })
    },  900000) // 900000 = 15 * 60 * 1000

    // Crée et envoie le mail
    const mailOptions: SendMailOptions = {
        from: process.env.USER_MAIL as string, 
        to: req.body.email as string,
        subject : "Valider votre inscription", 
        html: signUpConfirmation(tempCode)
    }

    transporter.sendMail(mailOptions, (err, succ) => {
        if(err) {
            return res.status(500).json("Une erreur s'est produite !");
        } 

        if(succ) {
            return res.status(201).json("Un mail de confirmation vient de vous être envoyer !")
        }
    })
}

export default signUp;