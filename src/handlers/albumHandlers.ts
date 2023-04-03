import prisma from "../db";
import {OpenAIApi, Configuration} from "openai";

export const addAlbum = async (req, res) => {
	try {
		const todaysAlbum = await prisma.album.create({
			data: {
				title: req.body.title,
				artist: req.body.artist,
				yearReleased: req.body.yearReleased,
				artUrl: req.body.artUrl,
				spotifyUrl: req.body.spotifyUrl,
				appleUrl: req.body.appleUrl,
			},
		});

		res.send({todaysAlbum: todaysAlbum});
	} catch (err) {
		res.status(400);
		res.send({message: "Unable to add album"});
	}
};

export const getAllAlbums = async (req, res) => {
	try {
		const albums = await prisma.album.findMany();

		res.send({albums: albums});
	} catch (err) {
		res.status(400);
		res.send({message: "Error getting albums"});
	}
};

export const getTodaysAlbum = async (req, res) => {
	try {
		const albums = await prisma.album.findMany();

		const todaysAlbum = albums[albums.length - 1];
		res.send({todaysAlbum: todaysAlbum});
	} catch (err) {
		res.status(400);
		res.send({message: "Error getting today's album"});
	}
};

export const getAlbumDescription = async (req, res) => {
	const albumName = req.body.albumName;
	const artistName = req.body.artistName;
	const config = new Configuration({
		apiKey: process.env.OPENAI_API_KEY,
	});

	const openai = new OpenAIApi(config);

	try {
		const gptResponse = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: `Tell me about the album ${albumName} by ${artistName} like you want me to listen`,
			temperature: 0.2,
			max_tokens: 512,
		});

		if (gptResponse.data.choices[0].text.startsWith(" to it")) {
			gptResponse.data.choices[0].text =
				gptResponse.data.choices[0].text.slice(6);
		}

		res.send({gptResponse: gptResponse.data.choices[0].text});
	} catch (err) {
		res.status(400);
		res.send({message: err});
	}
};
