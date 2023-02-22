import jwt from "jsonwebtoken";

export const appendUserToRequest = (req, res, next) => {
	const bearer = req.headers.authorization;

	if (!bearer) {
		res.status(401);
		res.json({message: "Missing auth header"});
		return;
	}

	const [, token] = bearer.split(" ");

	if (!token) {
		res.status(401);
		res.json({message: "Missing auth token"})
		return;
	}

	try {
		const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		req.user = user;
		next();
	} catch (err) {
		res.status(401);
		res.json({
			message: "Invalid auth token",
			error: err
		});
	}
};

export const onlyAdmin = (req, res, next) => {
	if (req.user.id !== process.env.ADMIN_USER_ID) {
		res.status(401);
		res.json({message: "Admin user only"})
		return;
	}

	next();
};