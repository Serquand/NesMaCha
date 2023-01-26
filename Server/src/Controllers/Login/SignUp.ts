import { RequestHandler, Request, Response } from "express"
import { hash } from "argon2";
import User from "../../Models/User";

const signUp : RequestHandler = (req: Request, res: Response) => {
    
    
    res.status(200).json({
        information: "We are working on that"
    })
}

export default signUp;