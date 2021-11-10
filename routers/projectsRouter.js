import express from "express";
const router = express.Router();

const mockProjects = [
    { name: "Node.js Recap", category: "Node.js", technologies: ["Node.js", "Html", "CSS"] },
    { name: "Nodefolio", category: "Node.js", technologies: ["Node.js", "Html", "CSS"] },
    { name: "Adventure XP", category: "Java", technologies: ["Java", "Thymeleaf", "CSS", "MySQL"] }
];

import { connectSqlite } from "../database/connectSqlite.js";

router.get("/api/projects", async (req, res) => {
    const dbConnection = await connectSqlite();

    const projects = await dbConnection.all("SELECT * FROM projects");

    res.send(projects);    
});

router.post("/api/projects", async (req, res) => {
    const newProject = req.body;

    const dbConnection = await connectSqlite();

    const projects = dbConnection.run(`
        INSERT INTO projects 
        ('title', 'category', 'technologies', 'links') 
        VALUES 
        (?, ?, ?, ?);
        `, 
        [newProject.title, newProject.category, newProject.technologies, newProject.links],
        function(err) {
            // Validate input instead.
            res.sendStatus(400)
        }
    )


    res.sendStatus(200)

})

router.get("/api/mock", (req, res) => {
    res.send( mockProjects );
});

export default router
