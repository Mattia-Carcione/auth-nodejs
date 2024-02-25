// DEPENDENCIES
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
// END DEPENDENCIES

// SETUP BACKEND
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// END SETUP

// CONFIG SERVER
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
// END CONFIG