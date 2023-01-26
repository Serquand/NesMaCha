import { RequestHandler, Request, Response, NextFunction } from "express"

const checkSignIn : RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    console.log('We successfully received this');
    
    next();
}

export default checkSignIn;