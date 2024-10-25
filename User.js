const express = require('express');
const router = express.Router();

// In-memory user storage (replace with database logic in production)
let users = [];

// Sign up a user
router.post('/signup', (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Check if the user already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists.' });
    }

    // Create a new user (In a real app, the password should be hashed)
    const newUser = {
        id: users.length + 1,
        username: username,
        password: password // Hash password in production
    };

    users.push(newUser);
    res.status(201).json({ message: 'User created successfully.', user: newUser });
});

// Log in a user
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Check if the user exists and password matches
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // Successful login
    res.status(200).json({ message: 'Login successful.', user: user });
});

// Get all users (for testing purposes)
router.get('/', (req, res) => {
    res.status(200).json(users);
});

// Get a specific user by ID
router.get('/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json(user);
});

module.exports = router;
