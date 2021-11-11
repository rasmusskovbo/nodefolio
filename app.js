/// Init ////
import express from "express";
import session from "express-session";
const app = express();

app.use(session({secret: 'shh'}));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/// Route import ///
import dataRouter from './routers/projectsRouter.js'
import pagesRouter from './routers/pagesRouter.js'
import contactRouter from './routers/contactRouter.js'
import adminRouter from './routers/adminRouter.js'

app.use(dataRouter)
app.use(pagesRouter)
app.use(contactRouter)
app.use(adminRouter)

/// PORT setup ///
const PORT = process.env.PORT || 3000

const server = app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port", server.address().port);
});