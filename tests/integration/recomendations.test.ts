import "../../src/setup";
import supertest from "supertest";
import app from "../../src/app";
import connection from "../../src/database";
import { bodyCreateSong, bodyWithoutLink, bodyWithoutName, createSongAndReturn, wrongLink } from "../factories/bodyFactory";
import { clearDatabase, endConnection } from "../utils/databaseUtils";

beforeEach(async ()=>{
  await clearDatabase();
});

afterAll(async ()=>{
  await endConnection()
});

describe("POST recommendations", () => {

  it("should answer with status 201", async () => {
    const body = bodyCreateSong();
    const response = await supertest(app).post("/recommendations").send(body);
    expect(response.status).toEqual(201);
  });

  it("shold answer with status 409 for conflict on youtubeLink", async ()=>{
    const body = bodyCreateSong();
    await supertest(app).post("/recommendations").send(body);
    const response = await supertest(app).post("/recommendations").send(body);
    expect(response.status).toEqual(409);
  });

  it("should answer with status 400 for empty link", async () => {
    const body = bodyWithoutLink();
    const response = await supertest(app).post("/recommendations").send(body);
    expect(response.status).toEqual(400);
  });

  it("should answer with status 400 for wrong link", async () => {
    const body = wrongLink();
    const response = await supertest(app).post("/recommendations").send(body);
    expect(response.status).toEqual(400);
  });

  it("should answer with status 400 for empty name", async () => {
    const body = bodyWithoutName();
    const response = await supertest(app).post("/recommendations").send(body);
    expect(response.status).toEqual(400);
  });
});

describe("POST recomendations/:id/downvote", ()=>{

  it("should answer with status 200 for valid params", async ()=>{
    const body = bodyCreateSong();
    await supertest(app).post("/recommendations").send(body);
    const response = await supertest(app).post("/recommendations/1/downvote");
    expect(response.status).toEqual(200);
  });

  it('returns 400 if the type of params is not number', async () => {
    const response = await supertest(app).post(`/recommendations/notAnId/downvote`);
    expect(response.status).toEqual(400);
  });

  it("should answer with status 401 when fail to find song", async ()=>{
    const body = bodyCreateSong();
    await supertest(app).post("/recommendations").send(body);
    const response = await supertest(app).post("/recommendations/10/downvote");
    expect(response.status).toEqual(401);
  });

  it('returns 200 if the score is decreased', async () => {
    const id = await createSongAndReturn();
    await supertest(app).post("/recommendations/1/downvote");
    const checkIfIncreased = await connection.query(`SELECT * FROM recommendations WHERE id = $1`, [id]);
    expect(checkIfIncreased.rows[0].score).toEqual(-1);
  });

  it('check if song its deleted after score is lower than -5', async ()=>{
    const id = await createSongAndReturn();
    await supertest(app).post("/recommendations/1/downvote");
    await supertest(app).post("/recommendations/1/downvote");
    await supertest(app).post("/recommendations/1/downvote");
    await supertest(app).post("/recommendations/1/downvote");
    await supertest(app).post("/recommendations/1/downvote");
    const checkIfDeleted = await connection.query(`SELECT * FROM recommendations WHERE id = $1`, [id]);
    expect(checkIfDeleted.rows.length).toEqual(0);
  });

});

describe("GET recommendations/top/:amount", ()=>{

  it("should answer with status 200 when sucessfully get top song based on amount", async ()=>{
    const body = bodyCreateSong();
    await supertest(app).post("/recommendations").send(body);
    const response = await supertest(app).get("/recommendations/top/1");
    expect(response.status).toEqual(200);
  });

  it("should answer with status 400 for invalid amount", async ()=>{
    const body = bodyCreateSong();
    await supertest(app).post("/recommendations").send(body);
    const response = await supertest(app).get("/recommendations/top/notANumber");
    expect(response.status).toEqual(400);
  });

});