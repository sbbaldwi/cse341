const routes = require('express').Router();
const lesson1Controller = require('../controllers/lesson1');

routes.get('/', lesson1Controller.jacobRoute);
routes.get('/bri', lesson1Controller.briRoute);


module.exports = routes;