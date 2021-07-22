import connection from "../database";

async function checkYoutubeLink(youtubeLink:string) {
    const check = await connection.query(`SELECT * FROM recomendations WHERE "youtubeLink" = $1`, [youtubeLink]);
    return check.rows
}

async function createSong(name:string, youtubeLink: string) {
    await connection.query(`INSERT INTO recomendations (name, "youtubeLink") VALUES ($1, $2)`, [name, youtubeLink]);
    return
}

export { checkYoutubeLink, createSong }