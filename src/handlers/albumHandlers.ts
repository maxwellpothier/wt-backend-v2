import prisma from "../db";

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