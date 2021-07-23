import connection from "../../src/database";
import { bodyCreateSong } from "../factories/bodyFactory"

export async function clearDatabase () {
    await connection.query('TRUNCATE recommendations RESTART IDENTITY')
}

export async function endConnection () {
    await clearDatabase();
    await connection.end();
}

export async function createSongAndReturn() {
    const body = bodyCreateSong();
    const create = await connection.query(`INSERT INTO recommendations (name, "youtubeLink") VALUES ($1, $2) RETURNING *`,[body.name, body.youtubeLink]);
    const id:number = create.rows[0].id;
    return id 
}

export async function updateSongForTest(){
    await connection.query(`UPDATE recommendations SET score = 3 WHERE id = 1`);
    await connection.query(`UPDATE recommendations SET score = 9 WHERE id = 2`);
    await connection.query(`UPDATE recommendations SET score = 27 WHERE id = 3`);
};
