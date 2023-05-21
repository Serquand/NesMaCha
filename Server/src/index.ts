import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors, { CorsOptions } from "cors";

import userRouter from "./Router/User";
import carPooling from "./Router/CarPooling";
import chatRouter from "./Router/Chat";

import setup from "./Models/Setup";
import setupSocket from "./Socket/SetupSocket";


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { 
    cors: { origin: "http://localhost:5173" } 
});

const PORT = process.env.PORT || 5050;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(process.env.URL_FRONT as CorsOptions));

app.use("/user", userRouter);
app.use("/carPooling", carPooling);
app.use("/chat", chatRouter);

httpServer.listen(PORT, () => {
    setup();
    console.clear();
    console.log("We are listening on PORT", PORT);
});

io.on("connect", (socket) => setupSocket(socket, io));