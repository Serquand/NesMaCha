import { Request, Response } from 'express'
import { GroupChatInformations } from '../../Types/Chat';
import Connection from '../../Models/Connection';

const ListChat = async (req: Request, res: Response) => {
    if(!req.params.idUser) return res.status(400).json("Need a valid access");
    
    const resDB = (await Connection.query(`
        SELECT c.name, c.idChannel FROM Channels AS c, UserChannels AS uc, Users AS u
        WHERE 
            u.pseudo = ? AND
            uc.idUser = u.idUser AND
            c.idChannel = uc.idChannel
    `, { replacements: [req.params.idUser] }));

    const list = new Array<GroupChatInformations>();

    for(let i = 0; i < resDB[0].length; i++) {
        list.push({
            id: (resDB[0][i] as any).idChannel, 
            unseenMessage: 0, 
            name: (resDB[0][i] as any).name
        });
    }

    res.status(200).json({ list });
}

export default ListChat;