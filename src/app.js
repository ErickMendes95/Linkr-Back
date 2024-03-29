import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import signUpRouter from "../routers/signUp.router.js";
import signInRouter from "../routers/signIn.router.js";
import postRouter from "../routers/post.router.js";
import hashtagRouter from "../routers/hashtag.router.js";
import trendRouter from "../routers/trending.router.js";
import userRouter from "../routers/user.router.js";
import followRouter from "../routers/follow.router.js";

import logoutRouter from "../routers/logout.router.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use([signUpRouter, signInRouter, postRouter, hashtagRouter, userRouter, trendRouter,followRouter, logoutRouter])

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in port: ${PORT}`));