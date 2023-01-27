import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors, { CorsOptions } from "cors";

import userRouter from "./Router/User";
import setup from "./Models/Setup";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors:  { origin: process.env.URL_FRONT } });

const PORT = process.env.PORT || 5050;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(process.env.URL_FRONT as CorsOptions));

app.use("/user", userRouter);

httpServer.listen(PORT, () => {
    setup();
    console.clear();
    console.log("We are listening on PORT", PORT);
});

io.on("connect", (socket) => {
    console.log("A new user is now connected !");
})