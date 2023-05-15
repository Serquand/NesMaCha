import { Request, Response } from 'express'

const ListAllUsers = (req: Request, res: Response) => {
    console.log("Test");
    
    const allUsers = ["Serquand", "Mehdi", "Marion", "Mélissa", "Fantôme"];

    return res.status(200).json(allUsers);
}

export default ListAllUsers;