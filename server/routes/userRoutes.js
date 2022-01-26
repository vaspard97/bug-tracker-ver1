import express from "express";
import {
	signUp,
	signIn,
	signOut,
	updatePassword,
	verifyEmail,
} from "../controller/user.js";
import { sendEmail } from "../controller/sendEmail.js";
const route = express.Router();

route.post("/signin", signIn);
route.post("/signup", signUp);
route.get("/signout", signOut);
route.post("/verify-email", verifyEmail);
route.patch("/updateUserPassword", updatePassword);

route.get("/send", sendEmail);

export default route;
