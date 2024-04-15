import { Request, Response } from 'express'

const createChat = (req: Request, res: Response) => {
    res.status(201).json({
        information: "The channel has been successfully created", 
        idChannel: "idChannel"
    })
}

export default createChat;