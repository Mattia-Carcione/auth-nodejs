# HASHING PASSWORD

## Setting backend

### Install bcrypt 
````
npm i bcrypt --save
````

### Importing dependencies
````
import bcrypt from "bcrypt";
````

### Setting salt rounds
````
const saltRounds = x; <!-- x = number of rounds, for example 10 -->
````

### Hashing with bcrypt in the registration method
````
bcrypt.hash(password, saltRounds, async (err, hash) => {
    // Print error if it exists
    if (err) return console.error("error hashing password: ", err);
    // else register the new user
    await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, hash]);
    // res.render or other action
    res.sendStatus(200);
});
````

Explanation of the bcrypt.hash method's arguments:
- input value of password
- number of loops (saltRounds);
- callback with arguments err and hash
the 'hash' variable contains the hashed password output which will be stored in the database.

### Comparing password in the login method
````
bcrypt.compare(password, user.password, (err, result) => {
    /* CHECK FOR ERROR  */
    if (err) return console.error("Error comparing password: ", err);
    /* CHECK IF THE COMPARE IS TRUE */
    if (result) {
        // res.render or other action
        res.sendStatus(200);
    } else {
        // Send an error message if the passwords don't match
        res.send("Incorrect password.");
    }
});
````

The bcrypt.compare method accepts: 
- input password value
- stored hashed password
- callback with arguments err and result
The 'result' variable is a boolean that returns true if the input password matches the stored password.