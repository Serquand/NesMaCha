import { RequestHandler, Request, Response, NextFunction } from 'express'

const chatAlreadyExist: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    next();
}

export default chatAlreadyExist;