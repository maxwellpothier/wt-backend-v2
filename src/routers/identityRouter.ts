import {Router} from "express";
import {
	createNewUser,
	getCurrentUserInfo,
	login,
	sendForgotPasswordEmail,
	changePassword
} from "../handlers/identityHandlers";
import { appendUserToRequest } from "../utils/middlewareUtils";
import {
	createUserValidators,
	forgotPasswordValidators,
	loginValidators,
	resetPasswordValidators
} from "./validators/identityValidators";

const identityRouter = Router();

identityRouter.post("/create", createUserValidators, createNewUser);
identityRouter.post("/login", loginValidators, login);
identityRouter.get("/", appendUserToRequest, getCurrentUserInfo);
identityRouter.post("/forgot-password", forgotPasswordValidators, sendForgotPasswordEmail);
identityRouter.post("/reset-password", resetPasswordValidators, appendUserToRequest, changePassword);

export default identityRouter;