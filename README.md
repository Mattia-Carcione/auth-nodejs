# Scaffolding Autenticazione

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

## Autenticazione di 1 livello

l'autenticazione di 1 livello si basa sulla registrazione dell'utente
semplicemente tramite email e password che vengono archiviati in un db
senza l'encrypting della password.

## Autenticazione di 2 livello

Il livello di sicurezza in più consiste nel fare hashing della password, 
ovvero una funzione che codifica la password così da non essere più mostrata in chiaro nel db.
L'hashing è un livello di sicurezza in più, in quanto è quasi impossibile ripristinare la codifica alla stringa di caratteri iniziale,
e consiste nel inserire alla password il "salt", ovvero una sequenza di caratteri che viene generata casualmente e inserita prima di fare l'hash.
Successivamente si applica la funzione di hashing, che prende la stringa di password e salt 
e la codifica in una sequenza di caratteri a lunghezza impostata che viene poi memorizzata nel db.
L'hashing è casuale e non è uguale ogni volta per la stessa password, in quanto il salt generato è casuale ogni volta. Inoltre, l'hashing viene eseguito più volte sulla stessa password, aggiungendo ad ogni codifica il salt: si parla infatti di salt rounds, ovvero ciclare l'hashing più volte sulla stessa password.
Per rendere ancora più sicuro l'hash, la password deve avere alcune caratteristiche come:
- lunghezza min 8 caratteri
- almeno una lettera maiuscola
- presenza di almeno una cifra
- presenza di almeno un carattere speciale.
