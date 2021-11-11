import express from "express";
const router = express.Router();
import nodemailer from "nodemailer"
const email = "nodefolio.skovbo@gmail.com";
import fs from "fs"
const credentials = JSON.parse(fs.readFileSync("config.json"))

router.post("/contact/", async (req, res) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: email,
          pass: credentials.pass
        }
      })

    const mailOptions = {
        from: req.body.email,
        to: email,
        subject: `New message from Nodefolio contact form - Name: ${req.body.name}, E-mail: ${req.body.email}`,
        text: req.body.message
    }

    let info = await transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            res.sendStatus(500)
        } else {
            res.sendStatus(200)
        }
    })
});

export default router