import { Socket } from "socket.io";
import checkJWT from "../Utils/JWT/CheckJWT";
import { socketInit } from "../Utils/WebSocket/WebSocket";

const setupSocket = (socket: Socket) => {
    console.log("A new user is connected !");

    socket.on("setupSession", information => {
        // If the auth is invalid, leave the process
        if(!checkJWT(information.user, information.token)) return;

        // Init the socket by joining all the rooms
        socketInit(information.user, socket);

        // Setup all the socket event
    });
} 

export default setupSocket;