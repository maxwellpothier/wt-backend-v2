import { body } from "express-validator";
import { handleInputErrors } from "../../utils/middlewareUtils";

export const createUserValidators = [
	body("username").trim().isString(),
	body("password").trim().isLength({min: 8}).withMessage("Password must be 8 characters long"),
	handleInputErrors,
];