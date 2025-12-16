import {DatabaseSync} from 'node:sqlite';

const db = new DatabaseSync(':memory:');

//execute SQL statments from strings
//THE UNIQUE COMMAND MEANS THAT WE CANNOT HAVE MORE THAN ONE USER WITH THE SAME USERNAME
//THE PRIMARY COMMAND MEANS ITS CAN BE REFRECED IN OTHER TABLES
//AUTOINCREMENT COMMAND INCREASES THE ID EVERYTIME A NEW USER IS MADE (foirst user is id 1)
db.exec(`
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        username TEXT UNIQUE,       
        password TEXT
    )    
`);

db.exec(`
    CREATE TABLE todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        task TEXT,
        completed BOOLEAN DEFAULT 0,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )    
`);

export default db;