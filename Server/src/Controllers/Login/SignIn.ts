import { RequestHandler, Request, Response } from "express"

const signIn : RequestHandler = (req: Request, res: Response) => {
    res.status(200).json({
        information: "We are working on that"
    })
}

export default signIn;