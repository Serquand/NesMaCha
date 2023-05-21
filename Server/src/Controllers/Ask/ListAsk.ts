import { Request, Response } from 'express'
import Connection from '../../Models/Connection';

const ListAsk = async (req: Request, res: Response) => {
    console.log(req.params.username);
    const list = (await Connection.query(`
        SELECT 
    `))[0];

    return res.status(200).json(list);
}

export default ListAsk;