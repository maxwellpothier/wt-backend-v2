import express from "express";
import morgan from "morgan";
import cors from "cors";
import identityRouter from "./routers/identityRouter";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/identity", identityRouter);

export default app;