const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const sqlite3 = require('sqlite3').verbose();
const contactRouter = require('./contact');
const usersRouter = require('./User');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to SQLite database
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Create tables
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL
    )`);
});

// Routes
app.use('/contact', contactRouter);
app.use('/user', usersRouter);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Contact Management API');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
