import { Server }  from "socket.io";

const addEveryoneToChannel: (everyone: Array<string>, channel: string, server: Server) => Promise<void> = async (everyone: Array<string>, channel: string, server: Server): Promise<void> => {
    const res = await server.fetchSockets(); // Fetch all the sockets connected
    for(let i = 0; i < res.length; i++) { // Iterate through the sockets
        res[i].rooms.forEach(room => { // Iterate through the rooms
            if(room.startsWith("user - ")) { // If it's the socket for the user
                if(everyone.includes(room.split(" ")[2])) { // Check if is included in everyone
                    res[i].join(channel) // If it's, join the channel gived in parameters               
                }
            }
        })
    }
}

export default addEveryoneToChannel;