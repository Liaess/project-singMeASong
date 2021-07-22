import express from "express";
import cors from "cors";
import { addSong } from "./controllers/recomendationsController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recomendations", addSong);

export default app;
