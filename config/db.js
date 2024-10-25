const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.sqlite', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

db.serialize(() => {
    // Create contacts table
    db.run(`CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        phone TEXT
    )`, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Contacts table created successfully.');
    });

    // Create users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT
    )`, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Users table created successfully.');
    });
});

module.exports = db;
