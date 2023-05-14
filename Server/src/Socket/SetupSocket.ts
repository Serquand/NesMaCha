import { Server, Socket } from "socket.io";
import checkJWT from "../Utils/JWT/CheckJWT";
import { allUsersDontExist, socketInit } from "../Utils/WebSocket/WebSocket";
import createChannel from "../Utils/Chat/CreateChannel";
import getIdOfEveryone from "../Utils/Chat/GetIdOfEveryone";
import addUserInChannel from "../Utils/Chat/AddUserInChannel";
import addEveryoneToChannel from "../Utils/Chat/AddEveryoneToChannel";

const setupSocket = (socket: Socket, io: Server) => {
    console.log("A new user is connected !");

    socket.on("newMessage", (message) => {
        console.log("We've got a new message :", message);
        io.emit("newMessage", message)
    });    

    socket.on("setupSession", information => {
        // If the auth is invalid, leave the process
        if(!checkJWT(information.user, information.token)) return;

        // Init the socket by joining all the rooms
        socketInit(information.user, socket);

        // Setup all the socket event
        socket.on("newMessage", (payload) => {
            // Need to check if the user is in the channel, if the user is logged in, if the channel exist, if the user is the good person
            console.log(payload);
            socket.broadcast.to(payload.channelId).emit("newMessage", {
                channelId: payload.channelId, 
                message: payload.message
            })
        });

        socket.on("newGroupe", async (payload) => {
            if(payload.listUsername.length == 0) return; // Check if the group is empty or not
            if(await allUsersDontExist(payload.listUsername)) return; // Check if all user successfully exist
            const everyoneId = await getIdOfEveryone([...payload.listUsername, information.user]); // Get the ID of all users
            const idChannel = await createChannel(payload, information.user); // Add the group in the database
            addUserInChannel(everyoneId, idChannel); // Add all the users in the database
            await addEveryoneToChannel(everyoneId, "channel - " + idChannel, io); // Add to the socket's channel the different user
            
            // Send the creation information
            const messageInformation = "Vous avez été ajouté au groupe : " + payload.groupName;
            io.to("channel - " + idChannel).emit("newInformation", messageInformation);
        });
    });
} 

export default setupSocket;