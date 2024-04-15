import { Request, Response, RequestHandler } from "express";
import getCommunitiesForDept from "../../Utils/CarPooling/GetCommunitiesForDept";

const getCities : RequestHandler = (req: Request, res: Response) => {
    const communities = getCommunitiesForDept(req.params.zipCode)
    
    return res.status(200).json({ communities })
}

export default getCities;