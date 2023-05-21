import express from "express";
import checkApply from "../Middlewares/Ask/CheckApply";
import listAsk from "../Controllers/Ask/ListAsk";
import apply from "../Controllers/Ask/Apply";
import AnswerAsk from "../Controllers/CarPooling/AnswerAsk";

const askRouter = express.Router();

askRouter.get("/list/:username", listAsk);
askRouter.post('/apply', checkApply, apply);
askRouter.post("/answer", AnswerAsk);

export default askRouter;