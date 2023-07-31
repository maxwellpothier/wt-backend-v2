import express from "express";
import morgan from "morgan";
import cors from "cors";
import identityRouter from "./routers/identityRouter";
import albumRouter from "./routers/albumRouter";
import postRouter from "./routers/postRouter";
import adminRouter from "./routers/adminRouter";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/identity", identityRouter);
app.use("/album", albumRouter);
app.use("/post", postRouter);
app.use("/admin", adminRouter);

export default app;
