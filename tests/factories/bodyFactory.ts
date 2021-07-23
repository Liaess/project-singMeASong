import faker from "faker";
import connection from "../../src/database";

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

export function bodyCreateSong(){
    return {
        name: faker.random.word(),
        youtubeLink: faker.internet.url()
    }
}

export function bodyWithoutLink(){
    return {
        name: faker.random.word(),
    }
}

export function wrongLink(){
    return {
        name: faker.random.word(),
        youtubeLink: faker.random.word()
    }
}

export function bodyWithoutName(){
    return {
        youtubeLink: faker.internet.url()
    }
}