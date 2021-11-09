import { connectSqlite } from "./connectSqlite.js";

(async () => {
    const dbConnection = await connectSqlite();

    await dbConnection.exec("DROP TABLE IF EXISTS projects");

    const gamesTableSchema = `
        CREATE TABLE projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT NOT NULL,
            technologies TEXT,
            links DOUBLE
        )
    `;

    await dbConnection.exec(gamesTableSchema);
})() 
