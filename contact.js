const express = require('express');
const router = express.Router();
const db = require('./config/db'); // Ensure the path is correct

// Create a new contact
router.post('/', (req, res) => {
    const { name, email, phone } = req.body; // Destructure data from request body

    if (!name || !email || !phone) {
        return res.status(400).json({ error: 'Please provide name, email, and phone' });
    }

    const sql = 'INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)';
    db.run(sql, [name, email, phone], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
});

// Get all contacts
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM contacts';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Get a specific contact by ID
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM contacts WHERE id = ?';
    const id = req.params.id;

    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.json(row);
    });
});

// Update a contact by ID
router.put('/:id', (req, res) => {
    const { name, email, phone } = req.body;
    const sql = 'UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?';
    const id = req.params.id;

    db.run(sql, [name, email, phone, id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.json({ message: 'Contact updated successfully' });
    });
});

// Delete a contact by ID
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM contacts WHERE id = ?';
    const id = req.params.id;

    db.run(sql, [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.json({ message: 'Contact deleted successfully' });
    });
});

module.exports = router;
