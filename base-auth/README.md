# Autenticazione di primo livello

## Come installare il progetto

### Installa le dipendenze
````
npm i
````

### Configura il db postgreSQL
````
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "", <!-- inserisci il nome del db qui -->
    password: "", <!-- inserisci la pass del db qui -->
    port: 5432
});
````

### Starta il server con nodemon
````
nodemon index.js
````

## Informazioni sull'autenticazione di 1 livello

l'autenticazione di 1 livello si basa sulla registrazione dell'utente
semplicemente tramite email e password che vengono archiviati in un db
senza l'encrypting della password.
