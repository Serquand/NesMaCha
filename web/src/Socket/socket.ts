import { Socket, io } from "socket.io-client";
import informations from "../../informations.json";

let socket: Socket;
export { socket };

export const setupSocket = () => {
    socket = io(informations.urlAPI as string);
}

export const sendMessage: (message: string, channelId: number) => void = (message: string, channelId: number): void => {
    socket.emit("newMessage", { message, channelId });
}

export const createGroup: (groupName: string, listUsername: Array<string>) => void = (groupName: string, listUsername: Array<string>): void => {
    socket.emit("newGroupe", { groupName, listUsername });
}

export const setupSession = (user: string, token: string) => {
    socket.emit("setupSession", { user, token });
}