import {Router} from "express";
import { createPost } from "../handlers/postHandlers";
import { appendUserToRequest } from "../utils/middlewareUtils";

const postRouter = Router();

postRouter.post("/create", appendUserToRequest, createPost);

export default postRouter;