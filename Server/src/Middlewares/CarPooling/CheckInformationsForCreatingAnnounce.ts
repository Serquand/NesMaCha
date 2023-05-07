import { RequestHandler, Request, Response, NextFunction } from 'express'

const CheckInformationsForCreatingAnnounce: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    next();
}

export default CheckInformationsForCreatingAnnounce;