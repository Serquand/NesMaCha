import { RequestHandler, Request, Response, NextFunction } from 'express'

const IsGoodUser: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    next();
}

export default IsGoodUser;