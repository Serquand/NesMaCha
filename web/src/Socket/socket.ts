import { Socket, io } from "socket.io-client";
import informations from "../../informations.json";

let socket: Socket;

const setupSocket = () => {
    socket = io(informations.urlAPI as string);
}

const sendMessage: (message: string) => void = (message: string): void => {
    console.log(message);
    socket.emit("newMessage", message);
}

export { socket, setupSocket, sendMessage };