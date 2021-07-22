import express from "express";
import cors from "cors";
import {  addSong, increaseScore, decreaseScore  } from "./controllers/recommendationsController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", addSong);

app.post("/recommendations/:id/upvote", increaseScore)

app.post("/recommendations/:id/downvote", decreaseScore)

export default app;
