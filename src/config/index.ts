import merge from "lodash.merge";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const stage = process.env.STAGE || "local";

let envConfig;

if (stage === "production") {
	envConfig = require("./prod").default;
} else if (stage === "staging") {
	envConfig = require("./staging").default;
} else {
	envConfig = require("./local").default;
}

export default merge({
	stage,
	env: process.env.NODE_ENV,
	port: 4550,
	adminId: process.env.ADMIN_USER_ID,
	jwtSecret: process.env.ACCESS_TOKEN_SECRET,
	dbUrl: process.env.DATABASE_URL,
}, envConfig);