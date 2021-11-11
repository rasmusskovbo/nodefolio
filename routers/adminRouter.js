import express from "express";
import bcrypt from "bcrypt";
import { connectSqlite } from "../database/connectSqlite.js";
const saltRounds = 10;
const router = express.Router();

router.post("/admin/login", async (req, res) => {
    const db = await connectSqlite()
    
    const hashInfo = await db.all(`
        SELECT hash FROM secrets WHERE id = 1
        `,
    )

    const hash = hashInfo.map(hash => hash.hash)

    bcrypt.compare(req.body.pass, hash[0], function(err, result) {
        if (result) {
            req.session.loggedIn = true;
            res.sendStatus(200);
        } else {
            res.sendStatus(400)
        }
    });        
})

router.get("/admin/logout", (req, res) => {
    req.session.loggedIn = false;
    res.redirect("/")
})

router.get("/saveAdminHash", (req, res) => {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.pass, salt, async function(err, hash) {
            
            const db = await connectSqlite()
    
            const SQL = await db.run(`
                INSERT INTO secrets 
                ('hash')
                VALUES
                (?);
                `,
                hash
            )
            .then(() => res.sendStatus(200))
            .catch(() => res.sendStatus(500))
        });
    });
})

export async function checkLogin (pass) {

}

export default router