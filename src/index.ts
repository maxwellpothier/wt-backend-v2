import * as dotenv from "dotenv";
dotenv.config();

import app from "./server";
const port = 4550;

app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
});