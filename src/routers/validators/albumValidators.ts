import { body } from "express-validator";
import { handleInputErrors } from "../../utils/middlewareUtils";

export const addAlbumValidators = [
	body("title").isString().not().isEmpty(),
	body("artist").isString().not().isEmpty(),
	body("yearReleased").isInt().withMessage("Year must be type Int"),
	body("artUrl").isString().not().isEmpty(),
	body("spotifyUrl").isString().not().isEmpty(),
	body("appleUrl").isString().not().isEmpty(),
	handleInputErrors
];