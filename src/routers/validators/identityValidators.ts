import { body } from "express-validator";
import { handleInputErrors } from "../../utils/middlewareUtils";

export const createUserValidators = [
	body("username").trim().not().isEmpty().withMessage("Username cannot be empty"),
	body("password").trim().isLength({min: 8}).withMessage("Password must be 8 characters long"),
	body("confirmPassword").trim().not().isEmpty().withMessage("Confirm password cannot be empty").custom((value, {req}) => {
		if (value !== req.body.password) {
			throw new Error("Passwords do not match");
		}
	}),
	body("firstName").trim().not().isEmpty().withMessage("First name cannot be empty"),
	body("lastName").trim().not().isEmpty().withMessage("Last name cannot be empty"),
	handleInputErrors,
];

export const loginValidators = [
	body("username").trim().not().isEmpty().withMessage("Username cannot be empty"),
	body("password").trim().not().isEmpty().withMessage("Password cannot be empty"),
	handleInputErrors,
];