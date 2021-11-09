/// Init ////
import express from "express";
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/// Route import ///
import dataRouter from './routers/projectsRouter.js'
//import pagesRouter from './routers/pagesRouter.js'
import contactRouter from './routers/contactRouter.js'

app.use(dataRouter)
//app.use(pagesRouter.router)
app.use(contactRouter)
import { createPage } from './util/render.js'

/// Ready HTML pages using createPage js ///
const frontpagePage = createPage("frontpage/frontpage.html", {
    title: "Nodefolio | Welcome"
})

const cvPage = createPage("cv/cv.html", {
    title: "Nodefolio | CV"
})

const contactPage = createPage("contact/contact.html", {
    title: "Nodefolio | Contact Me"
})

const projectsPage = createPage("projects/projects.html", {
    title: "Nodefolio | Projects"
})

/// HTTP Requests ///
app.get("/", (req, res) => {
    res.send(frontpagePage)
})

app.get("/cv", (req, res) => {
    res.send(cvPage)
})

app.get("/contact", (req, res) => {
    res.send(contactPage)
})

app.get("/projects", (req, res) => {
    res.send(projectsPage)
})

/// PORT setup ///
const PORT = process.env.PORT || 3000

const server = app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port", server.address().port);
});