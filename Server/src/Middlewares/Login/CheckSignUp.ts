import { RequestHandler, Request, Response, NextFunction } from "express"
import mailEfreiCheck from "../../Utils/User/MailEfreiCheck";
import userExists from "../../Utils/User/UserExists";

/* 
    Check :
    - Existence of the user
    - Email EFREI
    - Password not null
    - Password and confirm password match
    - Pseudo not null

    Extract : 
    - First name and last name
*/
const checkSignUp : RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    if(req.body.password != req.body.confirmPassword) {
        return res.status(400).json("Les mots de passe doivent être identiques");
    }
    
    if(!req.body.password || req.body.password == "") {
        return res.status(400).json("Le mot de passe ne doit pas être vide");
    }

    if(!req.body.pseudo || req.body.pseudo == "") {
        return res.status(400).json("Le pseudo ne doit pas être vide");
    }

    if(!req.body.email || req.body.email == "") {
        return res.status(400).json("L'adresse email ne doit pas être vide");
    }

    if(await userExists(req.body.email)) {
        return res.status(400).json("Vous avez déjà un compte !");
    }

    if(!mailEfreiCheck(req.body.email)) {
        return res.status(400).json("Vous devez vous inscrire avec votre adresse EFREI.");
    }

    req.body.firstName = "Esteban";
    req.body.lastName = "VINCENT";

    next();
}

export default checkSignUp;