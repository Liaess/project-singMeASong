import "../../src/setup";
import supertest from "supertest";
import app from "../../src/app";
import { bodyCreateSong, bodyWithoutLink, bodyWithoutName } from "../factories/bodyFactory";
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

  it("should answer with status 400 for invalid link", async () => {
    const body = bodyWithoutLink();
    const response = await supertest(app).post("/recommendations").send(body);
    expect(response.status).toEqual(400);
  });

  it("should answer with status 400 for invalid name", async () => {
    const body = bodyWithoutName();
    const response = await supertest(app).post("/recommendations").send(body);
    expect(response.status).toEqual(400);
  });
});

describe("POST recomendations/:id/upvote", ()=>{
  it("should answer with status 200 when sucessfully increase vote", async ()=>{
    const body = bodyCreateSong();
    await supertest(app).post("/recommendations").send(body);
    const response = await supertest(app).post("/recommendations/1/upvote");
    expect(response.status).toEqual(200);
  });
  it("should answer with status 401 when fail to find song", async ()=>{
    const body = bodyCreateSong();
    await supertest(app).post("/recommendations").send(body);
    const response = await supertest(app).post("/recommendations/10/upvote");
    expect(response.status).toEqual(401);
  });
});

describe("POST recomendations/:id/downvote", ()=>{
  it("should answer with status 200 when sucessfully decrease vote", async ()=>{
    const body = bodyCreateSong();
    await supertest(app).post("/recommendations").send(body);
    const response = await supertest(app).post("/recommendations/1/downvote");
    expect(response.status).toEqual(200);
  });
  it("should answer with status 401 when fail to find song", async ()=>{
    const body = bodyCreateSong();
    await supertest(app).post("/recommendations").send(body);
    const response = await supertest(app).post("/recommendations/10/downvote");
    expect(response.status).toEqual(401);
  });
});