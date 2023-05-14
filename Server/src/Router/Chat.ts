import express from "express";
import isAuth from "../Middlewares/Login/IsAuth";
import isValidCreation from "../Middlewares/Chat/IsValidCreation";
import chatAlreadyExist from "../Middlewares/Chat/ChatAlreadyExist";
import createChat from "../Controllers/Chat/CreateChat";
import isGoodUser from "../Middlewares/Login/IsGoodUser";
import getAllInformationsForChat from "../Controllers/Chat/GetAllInformationsForChat";
import chatExistence from "../Middlewares/Chat/ChatExistence";
import listChat from "../Controllers/Chat/ListChat";
import listAllUsers from "../Controllers/Chat/ListAllUsers";

const chatRouter = express.Router();

chatRouter.post("/create", isAuth, isGoodUser, isValidCreation, chatAlreadyExist, createChat);
chatRouter.get("/list/:idUser", isAuth, isGoodUser, listChat);
chatRouter.get("/searchUser/:searched?", listAllUsers);
chatRouter.get("/history/:idChat", isAuth, isGoodUser, chatExistence, getAllInformationsForChat);

export default chatRouter;