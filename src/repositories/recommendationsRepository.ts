import connection from "../database";

export async function checkYoutubeLink(youtubeLink:string) {
    const check = await connection.query(`SELECT * FROM recommendations WHERE "youtubeLink" = $1`, [youtubeLink]);
    return check.rows;
}

export async function createSong(name:string, youtubeLink: string) {
    await connection.query(`INSERT INTO recommendations (name, "youtubeLink") VALUES ($1, $2)`, [name, youtubeLink]);
    return;
}

export async function findSong(id:number) {
    const check = await connection.query(`SELECT * from recommendations where id = $1`, [id]);
    return check.rows[0];
}

export async function increaseFunction(id:number) {
    await connection.query(`UPDATE recommendations SET score = score+1 WHERE id = $1`, [id]);
    return;
}

export async function decreaseFunction(id:number) {
    const checkScore = await connection.query(`UPDATE recommendations SET score = score-1 WHERE id = $1 RETURNING *`, [id]);
    if(checkScore.rows[0].score <= -5){
        await connection.query(`DELETE FROM recommendations WHERE id = $1`, [id]);
    }
    return;
}

export async function getAll() {
    const getEveryThing = await connection.query(`SELECT * FROM recommendations`);
    return getEveryThing.rows
}