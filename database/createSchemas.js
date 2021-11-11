import { connectSqlite } from "./connectSqlite.js";

(async () => {
    const dbConnection = await connectSqlite();

    await dbConnection.exec("DROP TABLE IF EXISTS projects;");

    const projectTableSchema = `
        CREATE TABLE projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            category TEXT NOT NULL,
            technologies TEXT,
            links TEXT
        );
    `
    await dbConnection.exec(projectTableSchema);
})()

(async () => {
    const dbConnection = await connectSqlite();

    await dbConnection.exec("DROP TABLE IF EXISTS secrets;");

    const secretsSchema = `
        CREATE TABLE secrets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            hash TEXT NOT NULL
        );
    `
    await dbConnection.exec(secretsSchema);
})() 
