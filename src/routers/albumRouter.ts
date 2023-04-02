import {Router} from "express";
import {appendUserToRequest, onlyAdmin} from "../utils/middlewareUtils";
import {addAlbumValidators} from "./validators/albumValidators";
import {
	addAlbum,
	getAllAlbums,
	getTodaysAlbum,
	getAlbumDescription,
} from "../handlers/albumHandlers";

const albumRouter = Router();

albumRouter.get("/", getAllAlbums);
albumRouter.post(
	"/append",
	addAlbumValidators,
	appendUserToRequest,
	onlyAdmin,
	addAlbum
);
albumRouter.get("/today", getTodaysAlbum);
albumRouter.get("/description", getAlbumDescription);

export default albumRouter;
