import {Router} from "express";
import { addAlbum, getAllAlbums, getTodaysAlbum } from "../handlers/albumHandlers";
import { appendUserToRequest, onlyAdmin } from "../utils/middlewareUtils";
import { addAlbumValidators } from "./validators/albumValidators";

const albumRouter = Router();

albumRouter.get("/", getAllAlbums);
albumRouter.post("/append", addAlbumValidators, appendUserToRequest, onlyAdmin, addAlbum);
albumRouter.get("/today", getTodaysAlbum);

export default albumRouter;