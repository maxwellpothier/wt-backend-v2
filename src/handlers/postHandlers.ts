import prisma from "../db";

export const createPost = async (req, res) => {
	const albumExists = await prisma.album.findUnique({
		where: {
			id: req.body.albumId,
		},
	});

	if (!albumExists) {
		res.status(401);
		res.json({message: "Album specified not found"});
		return;
	}

	const postFound = await prisma.post.findFirst({
		where: {
			belongsToId: req.user.id,
			albumId: req.body.albumId,
		},
	});

	if (postFound) {
		res.status(401);
		res.json({message: "You've already made a post for this album"})
		return;
	}

	try {
		const newPost = await prisma.post.create({
			data: {
				content: req.body.content,
				rating: req.body.rating,
				belongsToId: req.user.id,
				albumId: req.body.albumId,
			},
		});
	
		res.send({post: newPost});
	} catch (err) {
		res.status(400);
		res.send({message: "Could not create post"});
	}
};

export const getPost = async (req, res) => {
	try {
		const post = await prisma.post.findUnique({
			where: {
				id: req.params.postId,
			},
			include: {
				album: true,
				belongsTo: {
					select: {
						username: true,
					},
				},
			},
		});

		if (!post) {
			res.status(401);
			res.json({message: "Could not find post"})
			return;
		}

		res.send({post: post});
	} catch (err) {
		res.status(400);
		res.send({message: "Could not get post"});
	}
};