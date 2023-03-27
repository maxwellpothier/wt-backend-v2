import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = (password) => {
	const salt = bcrypt.genSaltSync(10);
	return bcrypt.hash(password, salt);
};

export const comparePasswords = (password, hash) => {
	return bcrypt.compare(password, hash);
};

export const createJwt = (user, expiration = "8h") => {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: expiration});
};