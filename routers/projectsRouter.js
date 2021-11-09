import express from "express";
const router = express.Router();

const mockProjects = [
    { name: "Node.js Recap", category: "Node.js", technologies: ["Node.js", "Html", "CSS"] },
    { name: "Nodefolio", category: "Node.js", technologies: ["Node.js", "Html", "CSS"] },
    { name: "Adventure XP", category: "Java", technologies: ["Java", "Thymeleaf", "CSS", "MySQL"] }
];

import { connectSqlite } from "../database/connectSqlite.js";

// TODO return in a format that can be mapped in pages/projects.js
router.get("/api/projects", async (req, res) => {
    const dbConnection = await connectSqlite();

    const projects = await dbConnection.all("SELECT * FROM projects");

    res.send(projects);    
});

router.get("/api/mock", (req, res) => {
    res.send(mockProjects);    
});

router.get("/api/insert", async (req, res) => {
    //const projectToCreate = req.body;

    const dbConnection = await connectSqlite();

    const projects = dbConnection.run(`
    INSERT INTO 'projects'
    ('title', 'category') 
    VALUES 
    ('Test Title', 'Test Category');
    `);

    res.sendStatus(200)
    //res.send(projects);    
})

export default router
