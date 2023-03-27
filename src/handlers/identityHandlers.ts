import prisma from "../db";
import { hashPassword, comparePasswords, createJwt } from "../utils/authUtils";
import nodemailer from "nodemailer";

export const createNewUser = async (req, res) => {
	try {
		const findUser = await prisma.user.findUnique({
			where: { email: req.body.email }
		});

		if (findUser) {
			res.status(401);
			res.json({message: "Email must be unique"});
			return;
        }
		
		const newUser = await prisma.user.create({
			data: {
				username: req.body.username,
				email: req.body.email,
				password: await hashPassword(req.body.password),
				firstName: req.body.firstName,
				lastName: req.body.lastName,
			},
		});

		const accessToken = createJwt(newUser);
		res.send({accessToken: accessToken});
	} catch (err) {
		res.status(400);
		res.send({message: "Username has already been taken"});
	}
};

export const login = async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			username: req.body.username,
		},
	});

	if (!user) {
		res.status(401);
		res.json({message: "Username not found"});
		return;
	}

	const isValidPassword = await comparePasswords(req.body.password, user.password);

	if (!isValidPassword) {
		res.status(401);
		res.json({message: "Incorrect password"});
		return;
	}

	const accessToken = createJwt(user);
	res.send({accessToken: accessToken});
};

export const getCurrentUserInfo = async (req, res) => {
	const currUser = await prisma.user.findUnique({
		where: {
			username: req.user.username,
		},
		select: {
			posts: {
				include: {
					album: true,
				},
				orderBy: {
					createdAt: "desc",
				}
			},
			createdAt: true,
			firstName: true,
			id: true,
			email: true,
			lastName: true,
			username: true,
		},
	});

	res.send({data: currUser});
};

export const sendForgotPasswordEmail = async (req, res) => {
	const transporter = nodemailer.createTransport({
		service: "hotmail",
		auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
	});

	const currentUser = await prisma.user.findUnique({
		where: {
            email: req.body.email,
        },
	});

	if (!currentUser) {
		res.status(401);
		res.json({message: `Could not find user associated with ${req.body.email}`});
		return;
    }

	const resetToken = createJwt(currentUser, "10m");
	const baseUrl = process.env.STAGE === "production" ? "https://www.whatsturning.com" : 
	"http://localhost:3000";
	const link = `${baseUrl}/reset-password?token=${resetToken}`;

	const mailBody = {
		from: process.env.MAIL_USER,
        to: req.body.email,
        subject: "What's Turning Password Reset",
        text: "You are receiving this because you have requested the reset of the password for your account.\n\n" +
            "Please click on the following link, or paste this into your browser to complete the process:\n\n" + link
	};

	transporter.sendMail(mailBody, (err, info) => {
		if (err) {
			res.status(401);
			res.json({message: "Error sending email"});
			return;
		}

		res.send({data: info.response});
	});
};

export const changePassword = async (req, res) => {
	const newUser = await prisma.user.update({
		where: {
			id: req.user.id,
		},
		data: {
			password: await hashPassword(req.body.password),
		}
	});

	if (!newUser) {
		res.status(401);
		res.json({message: "Could not reset password"});
		return;
	}

	const accessToken = createJwt(newUser);
	res.send({accessToken: accessToken});
};