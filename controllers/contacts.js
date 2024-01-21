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

module.exports = {
    getAll,
    getSingle
};
