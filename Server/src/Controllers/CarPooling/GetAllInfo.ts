import { Request, Response } from 'express'
import Connection from '../../Models/Connection';
import Adress from '../../Models/Adress';
import { Op } from 'sequelize';
import { CarPooling } from '../../Types/CarPooling';

const getAllInfo = async (req: Request, res: Response) => {
    const carPooolingInfo = (await Connection.query(`
        SELECT 
            u.pseudo AS driver, 
            cp.from, 
            cp.to, 
            cp.dateDeparture, 
            cp.maxPassenger AS maxPlace, 
            cp.currentPassenger, 
            cp.status,
            cp.idCarPooling 
        FROM Users AS u, CarPoolings AS cp
        WHERE 
            cp.status = "Incoming" AND 
            cp.driver = u.idUser AND
            cp.idCarPooling = ?;
    `, { replacements: [req.params.idCarPooling] }))[0][0] as CarPooling | null;   

    if(!carPooolingInfo) {
        return res.status(404).json({ information: "La ressource demandée n'existe pas !" })
    }

    const passengerList = (await Connection.query(`
        SELECT u.pseudo 
        FROM Users AS u, Passengers AS p
        WHERE 
            u.idUser = p.passenger AND
            p.carPooling = ?;
    `, { replacements: [req.params.idCarPooling] }))[0] as any[];
    console.log(passengerList);

    carPooolingInfo.passengers = new Array<string>();
    for(let i = 0; i < passengerList.length; i++) {
        carPooolingInfo.passengers.push(passengerList[i].pseudo)
    }


    const adresses = await Adress.findAll({
        where: {
            idAdress: {[Op.or]: [carPooolingInfo.from, carPooolingInfo.to]}
        }
    });

    if(adresses[0].dataValues.idAdress == carPooolingInfo.from) {
        carPooolingInfo.from = {
            x: adresses[0].dataValues.xCoordinate, 
            y: adresses[0].dataValues.yCoordinate, 
        };
        carPooolingInfo.to = {
            x: adresses[1].dataValues.xCoordinate, 
            y: adresses[1].dataValues.yCoordinate, 
        };
    } else {
        carPooolingInfo.from = {
            x: adresses[1].dataValues.xCoordinate, 
            y: adresses[1].dataValues.yCoordinate, 
        };
        carPooolingInfo.to = {
            x: adresses[0].dataValues.xCoordinate, 
            y: adresses[0].dataValues.yCoordinate, 
        };
    }
    
    return res.status(200).json(carPooolingInfo);
}

export default getAllInfo;