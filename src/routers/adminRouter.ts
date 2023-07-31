import {Router} from "express";
import {updateAotd} from "../handlers/adminHandlers";
import {onlyAdmin} from "../utils/middlewareUtils";

const adminRouter = Router();

adminRouter.post("/update-aotd", onlyAdmin, updateAotd);

export default adminRouter;
