import faker from "faker";
import connection from "../../src/database";

export async function createSongAndReturn() {
    const body = bodyCreateSong();
    const create = await connection.query(`INSERT INTO recommendations (name, "youtubeLink") VALUES ($1, $2) RETURNING *`,[body.name, body.youtubeLink]);
    const id:number = create.rows[0].id;
    return id 
}

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