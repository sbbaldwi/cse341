/*my first approach

const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

router.get('/contacts', async (req, res) => {
    const client = new MongoClient(process.env.CONNECTION_STRING);
    try {
        await client.connect();
        const collection = client.db().collection('contacts');
        const contacts = await collection.find({}).toArray();
        res.json(contacts);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        client.close();
    }
});

module.exports = router;*/

const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getSingle);

module.exports = router;