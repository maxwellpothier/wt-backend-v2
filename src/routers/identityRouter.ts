import {Router} from "express";
import { createNewUser, getCurrentUserInfo, login } from "../handlers/identityHandlers";
import { appendUserToRequest } from "../utils/middlewareUtils";

const identityRouter = Router();

identityRouter.post("/create", createNewUser);
identityRouter.post("/login", login);
identityRouter.get("/", appendUserToRequest, getCurrentUserInfo);

export default identityRouter;