import {Router} from "express";
import { createPost, getPost } from "../handlers/postHandlers";
import { appendUserToRequest } from "../utils/middlewareUtils";
import { createPostValidators } from "./validators/postValidators";

const postRouter = Router();

postRouter.post("/create", createPostValidators, appendUserToRequest, createPost);
postRouter.get("/:postId", getPost);

export default postRouter;