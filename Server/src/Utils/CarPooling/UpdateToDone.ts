import CarPoolingModel from "../../Models/CarPoolingModel";
import { Op } from "sequelize";

const updateToDone: () => Promise<void> = async (): Promise<void> => {
    const date = new Date();
    console.log(date.getTime())
    await CarPoolingModel.update({ status: "Done" }, {
        where: {
            [Op.and]: [
                { status: "Incoming" },
                { dateDeparture: { [Op.lt]: date.getTime() }}
            ]
        }
    });
}

export default updateToDone;