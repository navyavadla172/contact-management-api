const express = require('express');
const router = express.Router();

// Sample in-memory storage
let contacts = [];

// Get all contacts
router.get('/', (req, res) => {
    res.status(200).json(contacts);
});

// Get a contact by ID
router.get('/:id', (req, res) => {
    const contact = contacts.find(c => c.id === parseInt(req.params.id));
    if (!contact) return res.status(404).send('Contact not found.');
    res.status(200).json(contact);
});

// Create a new contact
router.post('/', (req, res) => {
    const newContact = {
        id: contacts.length + 1,
        name: req.body.name,
        email: req.body.email,
    };
    contacts.push(newContact);
    res.status(201).json(newContact);
});

// Update a contact
router.put('/:id', (req, res) => {
    const contact = contacts.find(c => c.id === parseInt(req.params.id));
    if (!contact) return res.status(404).send('Contact not found.');

    contact.name = req.body.name;
    contact.email = req.body.email;
    res.status(200).json(contact);
});

// Delete a contact
router.delete('/:id', (req, res) => {
    const contactIndex = contacts.findIndex(c => c.id === parseInt(req.params.id));
    if (contactIndex === -1) return res.status(404).send('Contact not found.');

    contacts.splice(contactIndex, 1);
    res.status(200).json({ message: 'Contact deleted successfully.' });
});

module.exports = router;
