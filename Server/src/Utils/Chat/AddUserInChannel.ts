import UserChannel from "../../Models/UserChannel"

const addUserInChannel = (listUser: Array<string>, idChannel: number) => {
    const informations = new Array();
    for(let i = 0; i < listUser.length; i++) {
        informations.push({ idChannel, idUser: listUser[i] });
    }

    UserChannel.bulkCreate(informations);
}

export default addUserInChannel;