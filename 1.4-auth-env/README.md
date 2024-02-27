# ENVIRONMENT VARIABLE

## Setting backend

### Install dotenv
````
npm i dotenv --save
````

### Setting env
````
import env from "dotenv";

env.config();
````

### Create new file .env into the main directory and write your environment variable
VARIABLE_NAME="value"

### Importing your environment variable into index.js
const secret = process.env.VARIABLE_NAME;

## !!! IMPORTANT !!!
To protect your environment variable you have to create .gitignore and add the .env file