import express, { Router } from "express";

import signUp from "../Controllers/Login/SignUp";
import validAccount from "../Controllers/Login/validAccount";
import checkSignUp from "../Middlewares/Login/CheckSignUp";
import signIn from "../Controllers/Login/SignIn";
import isAuth from "../Middlewares/Login/IsAuth";

const router: Router = express.Router();

router.post("/signup", checkSignUp, signUp);
router.post("/signin", signIn);
router.post("/validAccount", validAccount);
// router.post("/retrieve", );
router.get("/:userName", isAuth, (req, res) => res.status(200).json("Successfully connected !"));

export default router;