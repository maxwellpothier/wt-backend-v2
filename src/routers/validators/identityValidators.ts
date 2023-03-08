import { body } from "express-validator";
import { handleInputErrors } from "../../utils/middlewareUtils";

export const createUserValidators = [
	body("username").trim().not().isEmpty().withMessage("Username cannot be empty"),
	body("password").trim().isLength({min: 8}).withMessage("Password must be 8 characters long"),
	body("firstName").trim().not().isEmpty().withMessage("First name cannot be empty"),
	body("lastName").trim().not().isEmpty().withMessage("Last name cannot be empty"),
	handleInputErrors,
];