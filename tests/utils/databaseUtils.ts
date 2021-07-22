import connection from "../../src/database";

export async function clearDatabase () {
    await connection.query('TRUNCATE recomendations RESTART IDENTITY')
}

export async function endConnection () {
    await clearDatabase();
    await connection.end();
}