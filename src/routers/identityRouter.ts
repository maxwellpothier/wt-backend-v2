import {Router} from "express";
import {
	createNewUser,
	getCurrentUserInfo,
	login,
	sendForgotPasswordEmail,
	changePassword,
	editCurrentUser,
} from "../handlers/identityHandlers";
import {appendUserToRequest} from "../utils/middlewareUtils";
import {
	createUserValidators,
	forgotPasswordValidators,
	loginValidators,
	resetPasswordValidators,
	editUserValidators,
} from "./validators/identityValidators";

const identityRouter = Router();

identityRouter.post("/create", createUserValidators, createNewUser);
identityRouter.post("/login", loginValidators, login);
identityRouter.get("/", appendUserToRequest, getCurrentUserInfo);
identityRouter.post(
	"/forgot-password",
	forgotPasswordValidators,
	sendForgotPasswordEmail
);
identityRouter.post(
	"/reset-password",
	resetPasswordValidators,
	appendUserToRequest,
	changePassword
);
identityRouter.post(
	"/edit",
	appendUserToRequest,
	editUserValidators,
	editCurrentUser
);

export default identityRouter;
