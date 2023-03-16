import { body } from "express-validator";
import { handleInputErrors } from "../../utils/middlewareUtils";

export const createPostValidators = [
	body("albumId").trim().not().isEmpty().withMessage("Unable to find album"),
	body("content").trim().not().isEmpty().withMessage("Post must include content"),
	body("rating").trim().not().isEmpty().withMessage("Rating cannot be empty"),
	handleInputErrors,
];