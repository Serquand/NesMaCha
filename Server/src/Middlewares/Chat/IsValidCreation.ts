import { Request, Response, RequestHandler, NextFunction } from "express"

const isValidCreation: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    next();
}

export default isValidCreation;