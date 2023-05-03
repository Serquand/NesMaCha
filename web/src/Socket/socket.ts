import { Socket, io } from "socket.io-client";
import informations from "../../informations.json";

let socket: Socket;

const setupSocket: Function = () => {
    socket = io(informations.urlAPI as string);
}

export { setupSocket };