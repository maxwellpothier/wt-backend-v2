import {IgApiClient} from "instagram-private-api";
import {get} from "request-promise";
import prisma from "../db";
import axios from "axios";
import {Configuration, OpenAIApi} from "openai";

export const updateAotd = async (req, res) => {
	try {
		const todaysAlbum = await appendAlbumToDb(req.body);
		await deployToVercel();
		await postToIG(
			req.body.title,
			req.body.artist,
			req.body.yearReleased,
			req.body.artUrl
		);
	} catch (err) {
		res.status(400);
		res.send({message: err.message});
		return;
	}

	res.send({message: "Successfully updated AOTD"});
};

const appendAlbumToDb = async ({
	title,
	artist,
	yearReleased,
	artUrl,
	spotifyUrl,
	appleUrl,
}) => {
	try {
		const todaysAlbum = await prisma.album.create({
			data: {
				title: title,
				artist: artist,
				yearReleased: yearReleased,
				artUrl: artUrl,
				spotifyUrl: spotifyUrl,
				appleUrl: appleUrl,
			},
		});

		return todaysAlbum;
	} catch (err) {
		throw new Error("Error adding album to database");
	}
};

const deployToVercel = async () => {
	axios
		.get(process.env.VERCEL_DEPLOY_HOOK_URL)
		.then(response => {
			console.log("Deploy hook triggered successfully");
		})
		.catch(error => {
			throw new Error("Failed to trigger deploy hook");
		});
};

//https://github.com/dilame/instagram-private-api/blob/master/examples/2fa-sms-login.example.ts

const postToIG = async (title, artist, yearReleased, artUrl) => {
	try {
		const ig = new IgApiClient();
		ig.state.generateDevice(process.env.INSTAGRAM_USERNAME);
		await ig.account.login(
			process.env.INSTAGRAM_USERNAME,
			process.env.INSTAGRAM_PASSWORD
		);

		const imageBuffer = await get({
			url: artUrl,
			encoding: null,
		});

		await ig.publish.photo({
			file: imageBuffer,
			caption: `${artist} - ${title} (${yearReleased}) \n\n${await generateIGCaption(
				title,
				artist
			)}`,
		});
	} catch (err) {
		throw new Error("Error posting to Instagram");
	}
};

const generateIGCaption = async (title, artist) => {
	const config = new Configuration({
		apiKey: process.env.OPENAI_API_KEY,
	});

	const openai = new OpenAIApi(config);

	try {
		const gptResponse = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: `Tell me about the album ${title} by ${artist}. Use 45-55 words.`,
			temperature: 0.9,
			max_tokens: 1024,
		});

		return gptResponse.data.choices[0].text;
	} catch (err) {
		return "";
	}
};
