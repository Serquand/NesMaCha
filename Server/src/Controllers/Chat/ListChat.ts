import { Request, Response } from 'express'
import { GroupChatInformations } from '../../Types/Chat';

const listChatInformations: Array<GroupChatInformations> = [
    {
        id: "1", 
        lastMessage: "Salut les coupaings !", 
        name: "Serquand", 
        unseenMessage: 1
    },
    {
        id: "2", 
        lastMessage: "Comment ça va ?", 
        name: "Lucario", 
        unseenMessage: 16
    }, 
    {
        id: "3", 
        lastMessage: "C'est Serquand !!", 
        name: "Mehdi W.", 
        unseenMessage: 0
    },
    {
        id: "4", 
        lastMessage: "Qui fait...", 
        name: "Julien S.", 
        unseenMessage: 0
    },
    {
        id: "5", 
        lastMessage: "Des tests...", 
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