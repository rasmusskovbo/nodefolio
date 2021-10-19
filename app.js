/// Init ////
const express = require('express')
const app = express()

/// HTTP Requests ///
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/frontpage.html")
})




/// PORT setup ///

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port", server.address().port);
});