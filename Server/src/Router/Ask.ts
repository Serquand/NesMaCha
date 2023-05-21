import express from "express";
import checkApply from "../Middlewares/Ask/CheckApply";
import listAsk from "../Controllers/Ask/ListAsk";
import apply from "../Controllers/Ask/Apply";

const askRouter = express.Router();

askRouter.post('/apply', checkApply, apply);
askRouter.get("/list/:username", listAsk);

export default askRouter;