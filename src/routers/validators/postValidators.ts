import { body } from "express-validator";
import { handleInputErrors } from "../../utils/middlewareUtils";

export const createPostValidators = [
	body("albumId").trim().not().isEmpty().withMessage("Unable to find album"),
	body("rating").trim().custom(value => {
		if (value === "10") return true;
		if (value === "0") return true;

		if (!/^\d\.\d$/.test(value)) {
			throw new Error("Invalid rating format");
		}

		return true;
	}),
	handleInputErrors,
];