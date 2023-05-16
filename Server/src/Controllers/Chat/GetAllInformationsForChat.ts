import { Request, Response } from 'express'
import Connection from '../../Models/Connection';

const GetAllInformationsForChat = async (req: Request, res: Response) => {    
    const listMessages = (await Connection.query(`
        SELECT u.pseudo, m.content, m.dateMessage
        FROM Users AS u, Messages AS m
        WHERE
            m.channel = ? AND
            u.idUser = m.sender;
    `, { replacements: [req.params.idChat] }))[0];

    return res.status(200).json(listMessages);
}

export default GetAllInformationsForChat;