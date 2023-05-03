import { RequestHandler, Request, Response, NextFunction } from "express"

const isAuth: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    next();
}

export default isAuth;