import { RequestHandler, Request, Response, NextFunction } from 'express'

const CheckApply: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    console.log("CheckApply");
    next();
}

export default CheckApply;