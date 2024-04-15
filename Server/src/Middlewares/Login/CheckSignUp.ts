import { RequestHandler, Request, Response, NextFunction } from "express"
import mailEfreiCheck from "../../Utils/User/MailEfreiCheck";
import userExists from "../../Utils/User/UserExists";

/* 
    Check :
    - Existence of the email
    - Existence of the pseudo
    - Email EFREI
    - Password not null
    - Password and confirm password match
    - Pseudo not null
*/
const checkSignUp : RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    if(req.body.password != req.body.confirmPassword) {
        return res.status(400).json({information: "Les mots de passe doivent être identiques"});
    }
    
    if(!req.body.password || req.body.password == "") {
        return res.status(400).json({information: "Le mot de passe ne doit pas être vide"});
    }
    
    if(!req.body.pseudo || req.body.pseudo == "" || req.body.pseudo.length >= 100) {
        return res.status(400).json({information: "Le pseudo ne doit pas être vide"});
    }

    if(!req.body.email || req.body.email == "" || req.body.email.length >= 100) {
        return res.status(400).json({information: "L'adresse email ne doit pas être vide"});
    }

    if(await userExists(req.body.email, req.body.pseudo)) {
        return res.status(400).json({information: "Vous avez déjà un compte !"});
    }

    if(!mailEfreiCheck(req.body.email)) {
        return res.status(400).json({information: "Vous devez vous inscrire avec votre adresse EFREI."});
    }

    next();
}

export default checkSignUp;