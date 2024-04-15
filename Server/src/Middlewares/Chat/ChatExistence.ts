import { RequestHandler, Request, Response, NextFunction } from 'express'

const ChatExistence: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    next();
}

export default ChatExistence;