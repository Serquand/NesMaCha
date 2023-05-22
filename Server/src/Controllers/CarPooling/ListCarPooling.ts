import { Request, Response } from 'express'
import { CarPooling } from '../../Types/CarPooling';
import Adress from '../../Models/Adress';
import Connection from '../../Models/Connection';
import Passenger from '../../Models/Passenger';
import { Op } from 'sequelize';
import User from '../../Models/User';

const ListCarPooling = async (req: Request, res: Response) => {
    const ourCarPoolings = new Array<CarPooling>();
    const otherCarPoolings = new Array<CarPooling>();
    const waitingAnswer = new Array<CarPooling>();
    const passengerList = new Array<CarPooling>();

    const userId = (await User.findOne({
        where: { pseudo: req.params.pseudo }
    }))?.dataValues.idUser;

    if(!userId) {
        return res.status(400).json({ information: "Woooops... Something went wrong !" })
    }

    const tempCarPoolings = (await Connection.query(`
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
            cp.driver = u.idUser
    `))[0] as Array<CarPooling>;
    const allAdress = await Adress.findAll();
    
    for(let i = 0; i < tempCarPoolings.length; i++) {
        const from = (allAdress.filter(value => value.dataValues.idAdress == tempCarPoolings[i].from))[0].dataValues;
        const to = (allAdress.filter(value => value.dataValues.idAdress == tempCarPoolings[i].to))[0].dataValues;
        const infoCarPoolings: CarPooling = {
            dateDeparture: tempCarPoolings[i].dateDeparture,
            driver: tempCarPoolings[i].driver, 
            from: {
                x: from.xCoordinate,
                y:  from.yCoordinate
            },
            maxPlace: tempCarPoolings[i].maxPlace,
            to: {
                x: to.xCoordinate,
                y:  to.yCoordinate
            },
            currentPassenger: tempCarPoolings[i].currentPassenger,
            idCarPooling: tempCarPoolings[i].idCarPooling
        }

        if(tempCarPoolings[i].status != "Incoming") continue;

        // Check if it's a waiting
        const isPassenger = (await Passenger.findOne({
            where: {
                [Op.and]: [
                    { carPooling: infoCarPoolings.idCarPooling },
                    { passenger: userId }
                ]
            }
        }))?.dataValues;

        if(isPassenger) {
            if(isPassenger.passengerValidate) passengerList.push(infoCarPoolings)
            else waitingAnswer.push(infoCarPoolings);
            continue;
        }
        

        if(tempCarPoolings[i].driver == req.params.pseudo) { 
            ourCarPoolings.push(infoCarPoolings);
        } else {
            otherCarPoolings.push(infoCarPoolings);
        }
    }

    return res.status(200).json({ 
        list: {
            ourCarPoolings, 
            otherCarPoolings,
            passengerList,
            waitingAnswer
        }
    });
}   

export default ListCarPooling;