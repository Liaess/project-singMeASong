import connection from "../database";

async function checkYoutubeLink(youtubeLink:string) {
    const check = await connection.query(`SELECT * FROM recommendations WHERE "youtubeLink" = $1`, [youtubeLink]);
    return check.rows;
}

async function createSong(name:string, youtubeLink: string) {
    await connection.query(`INSERT INTO recommendations (name, "youtubeLink") VALUES ($1, $2)`, [name, youtubeLink]);
    return;
}

async function findSong(id:number) {
    const check = await connection.query(`SELECT * from recommendations where id = $1`, [id]);
    return check.rows[0];
}

async function increaseFunction(id:number) {
    await connection.query(`UPDATE recommendations SET score = score+1 WHERE id = $1`, [id]);
    return;
}

async function decreaseFunction(id:number) {
    const checkScore = await connection.query(`UPDATE recommendations SET score = score-1 WHERE id = $1 RETURNING *`, [id]);
    if(checkScore.rows[0].score <= -5){
        await connection.query(`DELETE FROM recommendations WHERE id = $1`, [id]);
    }
    return;
}

export { checkYoutubeLink, createSong, findSong, increaseFunction, decreaseFunction}