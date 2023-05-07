import { Request, Response } from 'express'

const CreateAnnounce = (req: Request, res: Response) => {
    res.status(200).json("We are working on that !");
}

export default CreateAnnounce;