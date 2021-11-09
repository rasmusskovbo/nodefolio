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
