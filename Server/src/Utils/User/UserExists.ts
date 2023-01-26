import User from "../../Models/User"

const userExists: (email: String) => Promise<Boolean> = async (email: String): Promise<Boolean> => {
    const user = await User.findOne({ where: { email } });

    return user !== null;
}

export default userExists;