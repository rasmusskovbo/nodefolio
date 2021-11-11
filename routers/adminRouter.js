// Could check in database, but for one user it makes sense to keep it here. (albeit maybe not security-wise)
import express from "express";
const router = express.Router();

const credentials = "ZPR5mkc2efd@ywb4ybg";

router.post("/admin/login", (req, res) => {
    if (req.body.pass == credentials) {
        req.session.loggedIn = true;
        res.sendStatus(200);
    } else {
        res.sendStatus(400)
    }
})

router.get("/admin/logout", (req, res) => {
    req.session.loggedIn = false;
    res.redirect("/")
})

export default router