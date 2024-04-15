import User from "../../Models/User"

const getUserIdFromPseudo: (userName: string) => Promise<string> = async (userName: string): Promise<string> => {
    return (await User.findOne({
        where: { pseudo: userName }, 
        attributes: ["idUser"]
    }))?.dataValues.idUser
}   

export default getUserIdFromPseudo;