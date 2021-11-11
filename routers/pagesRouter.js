import express from "express";
const router = express.Router();
import { createPage } from '../util/render.js'
import path from "path";

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

const dashboardPage = createPage("dashboard/dashboard.html", {
    title: "Nodefolio | DSHBRD"
})

const adminPage = createPage("admin/admin.html", {
    title: "Nodefolio | Login"
})

/// HTTP Requests ///
router.get("/", (req, res) => {
    res.send(frontpagePage)
})

router.get("/cv", (req, res) => {
    res.send(cvPage)
})

router.get("/contact", (req, res) => {
    res.send(contactPage)
})

router.get("/projects", (req, res) => {
    res.send(projectsPage)
})

router.get("/dshbrd", (req, res) => {
    if (req.session.loggedIn) {
        res.send(dashboardPage)
    } else {
        res.redirect("/")
    }
})

router.get("/admin", (req, res) => {
    if (req.session.loggedIn) {
        res.send(dashboardPage)
    } else {
        res.send(adminPage)
    }
})

export default router

