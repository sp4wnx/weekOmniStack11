const express = require('express');
const OngController = require('./controllers/OngControler');
const PostController = require('./controllers/PostControler');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const routes = express.Router();

/** ONGs */
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

/** Posts */
routes.post('/posts', PostController.create);
routes.get('/posts', PostController.index);
routes.delete('/posts/:id', PostController.delete);

/** Profile */
routes.get('/profile', ProfileController.index);

/** Session */
routes.post('/sessions', SessionController.create);
// routes.get('/posts', PostController.index);

module.exports = routes;