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

    const projects = await dbConnection.run(`
        INSERT INTO projects 
        ('title', 'category', 'technologies', 'links') 
        VALUES 
        (?, ?, ?, ?);
        `, 
        [newProject.title, newProject.category, newProject.technologies, newProject.links]
    ).then(() => {
        res.sendStatus(200)
    }).catch(() => {
        // TODO customize response to assist in proper formatting
        res.sendStatus(400)
    })
})

router.delete("/api/projects/:projectId", async (req, res) => {
    const IDofProjectToDelete = req.params.projectId

    const dbConnection = await connectSqlite();

    dbConnection.run(`
        DELETE FROM projects WHERE id = ?
        `, 
        IDofProjectToDelete
    ).then(() => {
        res.sendStatus(200)
    }).catch(() => {
        // TODO customize response to assist in proper formatting
        res.sendStatus(404)
    })
})

router.put("/api/projects/", async (req, res) => {
    const project = req.body;
    console.log(project)

    const dbConnection = await connectSqlite();

    dbConnection.run(`
        UPDATE projects 
        SET 
        title = ?,
        category = ?,
        technologies = ?,
        links = ?
        WHERE id = ?
        `, 
        [project.title, project.category, project.technologies, project.links, project.id]
    ).then(() => {
        res.sendStatus(200)
    }).catch(() => {
        // TODO customize response to assist in proper formatting
        res.sendStatus(404)
    })
    
})

router.get("/api/mock", (req, res) => {
    res.send( mockProjects );
});

export default router
