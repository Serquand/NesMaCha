import { RequestHandler, Request, Response, NextFunction } from "express"

const checkSignUp : RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    console.log('We successfully received that');
    
    next();
}

export default checkSignUp;