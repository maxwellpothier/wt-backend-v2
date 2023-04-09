import {body} from "express-validator";
import {handleInputErrors} from "../../utils/middlewareUtils";
import prisma from "../../db";

export const createUserValidators = [
	body("username")
		.trim()
		.not()
		.isEmpty()
		.withMessage("Username cannot be empty"),
	body("email")
		.trim()
		.isEmail()
		.withMessage("Email must be a valid email address"),
	body("password")
		.trim()
		.isLength({min: 8})
		.withMessage("Password must be 8 characters long"),
	body("confirmPassword")
		.trim()
		.custom((value, {req}) => {
			if (value !== req.body.password) {
				throw new Error("Passwords do not match");
			}

			return true;
		}),
	body("firstName")
		.trim()
		.not()
		.isEmpty()
		.withMessage("First name cannot be empty"),
	body("lastName")
		.trim()
		.not()
		.isEmpty()
		.withMessage("Last name cannot be empty"),
	handleInputErrors,
];

export const loginValidators = [
	body("username")
		.trim()
		.not()
		.isEmpty()
		.withMessage("Username cannot be empty"),
	body("password")
		.trim()
		.not()
		.isEmpty()
		.withMessage("Password cannot be empty"),
	handleInputErrors,
];

export const forgotPasswordValidators = [
	body("email")
		.trim()
		.isEmail()
		.withMessage("Email must be a valid email address"),
	handleInputErrors,
];

export const resetPasswordValidators = [
	body("password")
		.trim()
		.isLength({min: 8})
		.withMessage("Password must be 8 characters long"),
	body("confirmPassword")
		.trim()
		.custom((value, {req}) => {
			if (value !== req.body.password) {
				throw new Error("Passwords do not match");
			}

			return true;
		}),
	handleInputErrors,
];

export const editUserValidators = [
	body("username")
		.trim()
		.custom(async (value, {req}) => {
			const usernameExists = await prisma.user.findUnique({
				where: {username: value},
			});
			if (!usernameExists) return true;
			if (usernameExists.id !== req.user.id) {
				throw new Error("Username already taken");
			}
			return true;
		}),
	body("email")
		.trim()
		.isEmail()
		.withMessage("Email must be a valid email address")
		.custom(async (value, {req}) => {
			const emailExists = await prisma.user.findUnique({
				where: {email: value},
			});
			if (!emailExists) return true;
			if (emailExists.id !== req.user.id) {
				throw new Error("Email already taken");
			}
			return true;
		}),
	handleInputErrors,
];
