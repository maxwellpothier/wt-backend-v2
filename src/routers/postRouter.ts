import {Router} from "express";
import { createPost } from "../handlers/postHandlers";

const postRouter = Router();

postRouter.post("/create", createPost);

export default postRouter;