# SETTING SESSION AND COOKIES

## Setting backend

### Install dependencies
````
npm i express-session passport passport-local
````

### Importing dependencies
````
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
````

### Setting cookies
````
app.use(session({
    secret: "PASSWORD", /* setting your secret password */
    resave: false, /* if false don't store session in the db */
    saveUninitialized: true /* store session in the server memory */
}));

app.use(passport.initialize()); /* initializing cookies session */
app.use(passport.session()); /* store cookies session */
````

### Setting middleware for login
````
passport.use(new Strategy(async function verify(username, password, cb) {
    // your code here
}));
````

Explanation of the middleware:
- input value of username
- input value of password;
- callback that returns err or user or set authentication to false. for example:
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

### Setting the post login route
````
app.post("/login", passport.authenticate("local", {
    successRedirect: "/URI", <!-- if login is successful redirect to /URI -->
    failureRedirect: "/login" <!--if login fails redirect to /login -->
}));
````

### Setting middleware for the secret page
````
app.get("/URI", (req, res) => {
    /* check for authentication */
    if (req.isAuthenticated()) return res.render("secrets.ejs");
    /* redirect to login if user isn't authenticated */
    res.redirect("login");
});
````

### Serialize/deserialize user into/out of the session before app.listen
````
passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});
````
