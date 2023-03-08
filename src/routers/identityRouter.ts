import {Router} from "express";
import { createNewUser, getCurrentUserInfo, login } from "../handlers/identityHandlers";
import { appendUserToRequest } from "../utils/middlewareUtils";
import { createUserValidators } from "./validators/identityValidators";

const identityRouter = Router();

identityRouter.post("/create", createUserValidators, createNewUser);
identityRouter.post("/login", login);
identityRouter.get("/", appendUserToRequest, getCurrentUserInfo);

export default identityRouter;