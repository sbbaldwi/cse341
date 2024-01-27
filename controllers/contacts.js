const { getDb } = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    try {
        const db = getDb();
        const collection = db.collection('contacts');
        const contacts = await collection.find({}).toArray();
        res.status(200).json(contacts);
    } catch (err) {
        console.error('Error in getAll:', err.message);
        res.status(500).json({ message: 'Error retrieving contacts', error: err.message });
    }
};

const getSingle = async (req, res) => {
    try {
        const db = getDb();
        const collection = db.collection('contacts');
        const contact = await collection.findOne({ _id: new ObjectId(req.params.id) });
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json(contact);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving contact' });
    }
};


const createContact = async (req, res) => {
    console.log(req.body);
    try {
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;

        if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const contact = { firstName, lastName, email, favoriteColor, birthday };
        const db = getDb();
        const collection = db.collection('contacts');
        const result = await collection.insertOne(contact);

        res.status(201).json({ id: result.insertedId });
    } catch (err) {
        res.status(500).json({ message: 'Error creating contact', error: err.message });
    }
};

const updateContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        const updateData = req.body;

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'No update data provided' });
        }

        const db = getDb();
        const collection = db.collection('contacts');

        const result = await collection.updateOne(
            { _id: new ObjectId(contactId) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json({ message: 'Contact updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating contact', error: err.message });
    }
};

const deleteContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        const db = getDb();
        const collection = db.collection('contacts');

        const result = await collection.deleteOne({ _id: new ObjectId(contactId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting contact', error: err.message });
    }
};


module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};