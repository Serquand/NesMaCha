import express, { Router } from "express";
import signUp from "../Controllers/Login/SignUp";
import checkSignIn from "../Middlewares/Login/CheckSignIn";
import checkSignUp from "../Middlewares/Login/CheckSignUp";

const router: Router = express.Router();

router.post("/signup", checkSignUp, signUp);
router.post("/signin", checkSignIn, );

export default router;