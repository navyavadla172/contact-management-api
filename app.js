const express = require('express');
const bodyParser = require('body-parser');
const contactRoutes = require('./contact'); // Make sure this path is correct

const app = express();

// Middleware
app.use(bodyParser.json()); // For parsing application/json
app.use('/contacts', contactRoutes); // Prefix routes with /contacts

// Database connection
const db = require('./config/db'); // Ensure this path is correct
db.serialize(() => {
    // Create tables if they don't exist
    db.run(`CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL
    )`, (err) => {
        if (err) {
            console.error('Error creating contacts table:', err.message);
        } else {
            console.log('Contacts table created successfully');
        }
    });

    // Optionally create a users table as well
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL
    )`, (err) => {
        if (err) {
            console.error('Error creating users table:', err.message);
        } else {
            console.log('Users table created successfully');
        }
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
