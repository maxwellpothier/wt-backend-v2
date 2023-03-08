import {Router} from "express";
import { createNewUser, getCurrentUserInfo, login } from "../handlers/identityHandlers";
import { appendUserToRequest } from "../utils/middlewareUtils";
import { createUserValidators, loginValidators } from "./validators/identityValidators";

const identityRouter = Router();

identityRouter.post("/create", createUserValidators, createNewUser);
identityRouter.post("/login", loginValidators, login);
identityRouter.get("/", appendUserToRequest, getCurrentUserInfo);

export default identityRouter;