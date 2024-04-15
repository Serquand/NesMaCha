import { Secret, verify } from "jsonwebtoken"

const checkJWT : (username: string, jwt: string) => boolean = (username: string, jwt: string): boolean => {
    try {
        const user = verify(jwt, process.env.JWT_SECRET as Secret);
        const logged = (user && user == username) as boolean;
        return logged;
    } catch {
        return false;
    }
}

export default checkJWT;