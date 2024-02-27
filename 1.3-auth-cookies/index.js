// DEPENDENCIES
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

import bcrypt from "bcrypt"; /* IMPORT BCRYPT */
// END DEPENDENCIES

/* IMPORT COOKIES DEPENDENCIES */
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
/* END IMPORT COOKIES DEPENDENCIES */

/* SETTING SALT ROUNDS */
const saltRounds = 10;

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

/* SETTING COOKIES */
app.use(session({
    secret: "PASSWORD", /* setting your secret password */
    resave: false, /* don't store session in the db */
    saveUninitialized: true /* store session in the server memory */
}));

app.use(passport.initialize()); /* initializing session cookies */
app.use(passport.session()); /* store session cookies */
/* END SETTING COOKIES */

// ROUTES
app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/secrets", (req, res) => {
    /* check for authentication */
    if (req.isAuthenticated()) return res.render("secrets.ejs");
    /* redirect to login if user isn't authenticated */
    res.redirect("login");
});

// register
app.get("/register", (req, res) => {
    res.render("register.ejs");
});

// register new user
app.post("/register", async (req, res) => {
    // get the input values
    const email = req.body.username;
    const password = req.body.password;

    // check values are there
    if (email && password) {
        try {
            // check email already exists into db
            const emailCheck = await db.query("SELECT * FROM users WHERE email = $1", [email]);

            // if email exists send error msg
            if (emailCheck.rows.length > 0) {
                res.send("Email already exists. Please, login or sign up with another email.");
            } else {
                /* HASHING PASSWORD */
                bcrypt.hash(password, saltRounds, async (err, hash) => {
                    // Print error if exists
                    if (err) return console.error("error hashing password: ", err);
                    // else register the new user
                    await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, hash]);
                    // res.render or something else
                    res.render("/secrets");
                });
                /* END HASHING PASSWORD */
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

// login page
app.get("/login", (req, res) => {
    res.render("login.ejs");
})

// login
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secrets",
    failureRedirect: "/login"
}));
// END ROUTES

/* MIDDLEWARE FOR LOGIN */
passport.use(new Strategy(async function verify(username, password, cb) {
        try {
            // check email exists
            const emailCheck = await db.query("SELECT * FROM users WHERE email = $1", [username]);
            if (emailCheck.rows.length > 0) {
                // save user's credentials
                const user = emailCheck.rows[0];

                /* COMPARING PASSWORD FROM INPUT TO STORED PASSWORD */
                bcrypt.compare(password, user.password, (err, result) => {
                    /* CHECK FOR ERROR  */
                    if (err) return cb(err);
                    /* CHECK IF COMPARE IS TRUE */
                    if (result) {
                        return cb(null, user);
                    } else {
                        // SET TO FALSE THE AUTHENTICATION
                        return cb(null, false);
                    }
                });
                /* END COMPARING PASSWORD */

            } else {
                // send error msg if the email doesn't exists
                return cb("User not found.");
            }
        } catch (error) {
            // catch error db and send error msg
            console.error(error);
            res.sendStatus(500);
        }
}));
/* END MIDDLEWARE */

/* SAVING DATA OF USER INTO SESSION */
passport.serializeUser((user, cb) => {
    cb(null, user);
});
/* DESERIALIZE DATA USER OUT OF THE SESSION */
passport.deserializeUser((user, cb) => {
    cb(null, user);
});

// CONFIG SERVER
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
// END CONFIG