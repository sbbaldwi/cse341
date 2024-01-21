const express = require('express');
const routes = express.Router();

const contactsRouter = require('./contacts');
routes.use('/contacts', contactsRouter);

module.exports = routes;