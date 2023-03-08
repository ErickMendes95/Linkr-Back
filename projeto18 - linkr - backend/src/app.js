import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import signUpRouter from "../routers/signUp.router.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use([signUpRouter])

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in port: ${PORT}`));