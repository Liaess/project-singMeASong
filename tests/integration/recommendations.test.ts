import "../../src/setup";
import supertest from "supertest";
import app from "../../src/app";
import { bodyCreateSong, bodyWithoutLink } from "../factories/bodyFactory";
import { clearDatabase, endConnection } from "../utils/databaseUtils";


beforeEach(async ()=>{
  await clearDatabase();
});

afterAll(async ()=>{
  await endConnection()
});

describe("POST recomendations", () => {
  it("should answer with status 201", async () => {
    const body = bodyCreateSong();
    const response = await supertest(app).post("/recomendations").send(body);
    expect(response.status).toEqual(201);
  });

  it("shold answer with status 409 for conflict on youtubeLink", async ()=>{
    const body = bodyCreateSong();
    await supertest(app).post("/recomendations").send(body);
    const response = await supertest(app).post("/recomendations").send(body);
    expect(response.status).toEqual(409);
  });

  it("should answer with status 400 for invalid name", async () => {
    const body = bodyWithoutLink();
    const response = await supertest(app).post("/recomendations").send(body);
    expect(response.status).toEqual(400);
  });
});
