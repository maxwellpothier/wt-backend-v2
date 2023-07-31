export const updateAotd = (req, res) => {
	console.log("Body", req.body);
	res.send({update: "Ready to update AOTD"});
};
