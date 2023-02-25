import {Router} from "express";
import { createPost, getPost } from "../handlers/postHandlers";
import { appendUserToRequest } from "../utils/middlewareUtils";

const postRouter = Router();

postRouter.post("/create", appendUserToRequest, createPost);
postRouter.get("/:postId", getPost);

export default postRouter;