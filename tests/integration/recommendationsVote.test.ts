import "../../src/setup";
import supertest from "supertest";
import app from "../../src/app";
import connection from "../../src/database";
import { bodyCreateSong, createSongAndReturn } from "../factories/bodyFactory";
import { clearDatabase, endConnection } from "../utils/databaseUtils";

beforeEach(async ()=>{
    await clearDatabase();
  });
  
  afterAll(async ()=>{
    await endConnection()
  });

describe("POST recomendations/:id/upvote", ()=>{

    it("should answer with status 200 for valid params", async ()=>{
      const body = bodyCreateSong();
      await supertest(app).post("/recommendations").send(body);
      const response = await supertest(app).post("/recommendations/1/upvote");
      expect(response.status).toEqual(200);
    });
  
    it('returns 400 if the type of params is not number', async () => {
      const response = await supertest(app).post(`/recommendations/notAnId/upvote`);
      expect(response.status).toEqual(400);
    });
  
    it("should answer with status 401 when fail to find song", async ()=>{
      const body = bodyCreateSong();
      await supertest(app).post("/recommendations").send(body);
      const response = await supertest(app).post("/recommendations/10/upvote");
      expect(response.status).toEqual(401);
    });
  
    it('returns 200 if the score is increased', async () => {
      const id = await createSongAndReturn();
      await supertest(app).post("/recommendations/1/upvote");
      const checkIfIncreased = await connection.query(`SELECT * FROM recommendations WHERE id = $1`, [id]);
      expect(checkIfIncreased.rows[0].score).toEqual(1);
    });
  
  });