// DEPENDENCIES
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
// END DEPENDENCIES

// SETUP BACKEND
const app = express();
const port = 3000;
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "users",
    password: "rootroot",
    port: 5432
});

db.connect();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// END SETUP

// ROUTES
app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/register", (req, res) => {
    res.render("register.ejs");
});

// register new user
app.post("/register", async (req, res) => {
    // get the input values
    const email = req.body.emailInput;
    const password = req.body.passwordInput;

    // check values are there
    if (email && password) {
        try {
            // check email already exists into db
            const emailCheck = await db.query("SELECT * FROM users WHERE email = $1", [email]);

            // if email exists send error msg
            if (emailCheck.rows.length > 0) {
                res.send("Email already exists. Please, login or sign up with another email.");
            } else {
                // else register the new user
                await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password]);
                // res.render or something else
            }
        } catch (error) {
            // catch db error
            console.error(error);
            res.sendStatus(500);
        }
    } else {
        // if input values are empty send error status
        res.status(417).send("Expectation Failed");
    }
});
// END ROUTES

// CONFIG SERVER
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
// END CONFIG