import { Request, Response } from 'express'
import { GroupChatInformations } from '../../Types/Chat';

const listChatInformations: Array<GroupChatInformations> = [
    {
        id: "1", 
        name: "Serquand", 
        unseenMessage: 1
    },
    {
        id: "2", 
        name: "Lucario", 
        unseenMessage: 16
    }, 
    {
        id: "3", 
        name: "Mehdi W.", 
        unseenMessage: 0
    },
    {
        id: "4", 
        name: "Julien S.", 
        unseenMessage: 0
    },
    {
        id: "5", 
        name: "Baptiste LE CALLONNEC.", 
        unseenMessage: 5
    },
]

const ListChat = (req: Request, res: Response) => {
    res.status(200).json({
        list: listChatInformations
    });
}

export default ListChat;