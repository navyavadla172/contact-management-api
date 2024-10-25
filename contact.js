const express = require('express');

const router = express.Router();

// Create a contact
router.post('/', (req, res) => {
    const { userId, name, email, phone } = req.body;

    const query = `INSERT INTO contacts (userId, name, email, phone) VALUES (?, ?, ?, ?)`;
    db.run(query, [userId, name, email, phone], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
});

// Get all contacts for a user
router.get('/:userId', (req, res) => {
    const query = `SELECT * FROM contacts WHERE userId = ?`;
    db.all(query, [req.params.userId], (err, contacts) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(contacts);
    });
});

// Update a contact
router.put('/:id', (req, res) => {
    const { name, email, phone } = req.body;
    const query = `UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?`;

    db.run(query, [name, email, phone, req.params.id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ changes: this.changes });
    });
});

// Delete a contact
router.delete('/:id', (req, res) => {
    const query = `DELETE FROM contacts WHERE id = ?`;

    db.run(query, [req.params.id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(204).send();
    });
});

module.exports = (database) => {
    db = database;
    return router;
};
