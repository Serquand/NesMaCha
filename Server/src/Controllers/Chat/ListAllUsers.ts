import { Request, Response } from 'express'

const ListAllUsers = (req: Request, res: Response) => {
    console.log("Test");
    
    const allUsers = ["Serquand", "Aliette", "Myriam", "Amélie", "Léa"];

    return res.status(200).json(allUsers);
}

export default ListAllUsers;