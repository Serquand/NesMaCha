import { Server, Socket } from "socket.io";
import checkJWT from "../Utils/JWT/CheckJWT";
import { allUsersDontExist, socketInit } from "../Utils/WebSocket/WebSocket";
import createChannel from "../Utils/Chat/CreateChannel";
import getIdOfEveryone from "../Utils/Chat/GetIdOfEveryone";
import addUserInChannel from "../Utils/Chat/AddUserInChannel";
import addEveryoneToChannel from "../Utils/Chat/AddEveryoneToChannel";
import UserNotInChannel from "../Utils/Chat/UserNotInChannel";
import channelExist from "../Utils/Chat/ChannelExist";
import Message from "../Models/Message";
import getUserIdFromPseudo from "../Utils/User/GetUserIdFromPseudo";

const setupSocket = (socket: Socket, io: Server) => {
    console.log("A new user is connected !");

    socket.on("setupSession", async information => {
        if(!checkJWT(information.user, information.token)) return; // If the auth is invalid, leave the process

        await socketInit(information.user, socket); // Init the socket by joining all the rooms

        socket.on("newMessage", async (payload) => {
            if(!await channelExist(payload.channelId)) return; // Check if the channel exists
            
            const userId = await getUserIdFromPseudo(information.user);
            if(await UserNotInChannel(userId, payload.channelId)) return; // Check if the user is in the channel
            
            await Message.create({
                sender: userId,
                dateMessage: Date.now(),
                channel: payload.channelId,
                content: payload.message
            })

            io.to("channel - " + payload.channelId).emit("newInformation", { 
                newMessage: {
                    pseudo: information.user,
                    content: payload.message,
                    dateMessage: Date.now()
                },
                channelId: payload.channelId, 
                information: payload.message, 
                type: "newMessage"
            })
        });

        socket.on("newGroupe", async (payload) => {
            if(payload.listUsername.length == 0) return; 
            if(await allUsersDontExist(payload.listUsername)) return; 
            const everyoneId = await getIdOfEveryone([...payload.listUsername, information.user]); 
            const idChannel = await createChannel(payload, information.user); // Add the group in the database
            addUserInChannel(everyoneId, idChannel); // Add all the users in the database
            await addEveryoneToChannel(everyoneId, "channel - " + idChannel, io); // Add to the socket's channel the different user
            
            const messageInformation = "Vous avez été ajouté au groupe : " + payload.groupName;
            io.to("channel - " + idChannel).emit("newInformation", { 
                information: messageInformation, 
                type: "newGroup", 
                newChannel: {
                    id: idChannel, 
                    unseenMessage: 0, 
                    name: payload.groupName
                }
            });
        });
    });
} 

export default setupSocket;