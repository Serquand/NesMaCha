import { RequestHandler, Request, Response, NextFunction } from 'express'

const CheckApply: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    next();
}

export default CheckApply;