import "../../src/setup";
import supertest from "supertest";
import app from "../../src/app";
import { bodyCreateSong } from "../factories/bodyFactory";
import { clearDatabase, endConnection } from "../utils/databaseUtils";

beforeEach(async ()=>{
    await clearDatabase();
  });
  
  afterAll(async ()=>{
    await endConnection()
  });

describe("GET recommendations/random", ()=>{
  
    it("should answer with status 404 when not find a song", async ()=>{
      const response = await supertest(app).get("/recommendations/random");
      expect(response.status).toEqual(404);
    });
  
    it("should answer with status 200 when sucessfully get a random song", async ()=>{
      const body = bodyCreateSong();
      await supertest(app).post("/recommendations").send(body);
      const response = await supertest(app).get("/recommendations/random");
      expect(response.status).toEqual(200);
    });
  });