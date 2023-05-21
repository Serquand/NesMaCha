import { Request, Response } from 'express'
import Connection from '../../Models/Connection';
import Channel from '../../Models/Channel';

const GetAllInformationsForChat = async (req: Request, res: Response) => {    
    const listMessages = (await Connection.query(`
        SELECT u.pseudo, m.content, m.dateMessage
        FROM Users AS u, Messages AS m
        WHERE
            m.channel = ? AND
            u.idUser = m.sender
        ORDER BY m.dateMessage ASC;
    `, { replacements: [req.params.idChat] }))[0];

    const nameChannel = (await Channel.findOne({
        where: { idChannel: req.params.idChat }, 
        attributes: ['name']
    }))?.dataValues.name;

    const listUserInChannel = (await Connection.query(`
        SELECT u.pseudo 
        FROM Users AS u, UserChannels AS uc
        WHERE uc.idUser = u.idUser AND 
        uc.idChannel = ?
    `, { replacements: [req.params.idChat] }))[0];
    

    return res.status(200).json({ listMessages, nameChannel, listUserInChannel });
}

export default GetAllInformationsForChat;