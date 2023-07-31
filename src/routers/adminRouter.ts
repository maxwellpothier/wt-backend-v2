import {Router} from "express";
import {updateAotd} from "../handlers/adminHandlers";
import {appendUserToRequest, onlyAdmin} from "../utils/middlewareUtils";

const adminRouter = Router();

adminRouter.post("/update-aotd", appendUserToRequest, onlyAdmin, updateAotd);

export default adminRouter;
