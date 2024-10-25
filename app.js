const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const User = require('./User');
const Contact = require('./contact');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// SQLite Database Setup
const db = new sqlite3.Database(':memory:'); // Use in-memory database for testing

db.serialize(() => {
    // Create tables
    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        name TEXT,
        email TEXT,
        phone TEXT,
        FOREIGN KEY (userId) REFERENCES users(id)
    )`);
});

// Routes
app.use('/users', User(db));
app.use('/contacts', Contact(db));

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Contact Management API');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Connected to SQLite database');
});
