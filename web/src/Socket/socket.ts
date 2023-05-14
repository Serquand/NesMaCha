import { Socket, io } from "socket.io-client";
import informations from "../../informations.json";

let socket: Socket;
export { socket };

export const setupSocket = () => {
    socket = io(informations.urlAPI as string);
}

export const sendMessage: (message: string) => void = (message: string): void => {
    console.log(message);
    socket.emit("newMessage", message);
}

export const createGroup: (groupName: string, listUsername: Array<string>) => void = (groupName: string, listUsername: Array<string>): void => {
    socket.emit("newGroupe", { groupName, listUsername });
}

export const setupSession = (user: string, token: string) => {
    socket.emit("setupSession", { user, token });
}