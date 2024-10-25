const express = require('express');
const db = require('./config/db'); // Adjust the path if needed
const router = express.Router();

// Register a new user
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Failed to register user' });
        }
        res.status(201).json({ id: this.lastID });
    });
});

// Login user (implement your logic here)
router.post('/login', (req, res) => {
    // Add your authentication logic here
});

module.exports = router;
