import { Request, Response } from 'express'

const informations = [
    {
        contentMessage: "Contenu du message", 
        nameSender: 'Lucario', 
        timeStampSubmit: "111"
    }, 
    {
        contentMessage: "Contenu du message 2", 
        nameSender: 'Lucario 2', 
        timeStampSubmit: "1111"
    },
    {
        contentMessage: "Contenu du message 3", 
        nameSender: 'Lucario 3', 
        timeStampSubmit: "11111"
    } 
]

const GetAllInformationsForChat = (req: Request, res: Response) => {
    return res.status(200).json(informations);
}

export default GetAllInformationsForChat;