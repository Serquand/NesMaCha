import express, { Router } from "express";

import signUp from "../Controllers/Login/SignUp";
import validAccount from "../Controllers/Login/validAccount";
import checkSignUp from "../Middlewares/Login/CheckSignUp";
import signIn from "../Controllers/Login/SignIn";

const router: Router = express.Router();

router.post("/signup", checkSignUp, signUp);
router.post("/signin", signIn);
router.post("/validAccount", validAccount);
router.post("/retrieve", );

export default router;