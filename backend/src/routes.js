const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngControler');
const PostController = require('./controllers/PostControler');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const routes = express.Router();

/** ONGs */
routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.number().required().min(10).max(11),
    city: Joi.string().required(),
    state: Joi.string().required().length(2)
  })
}), OngController.create);

/** Posts */
routes.post('/posts', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().min(10).required(),
    description: Joi.string().min(10),
    value: Joi.number().required()
  })
}),PostController.create);
routes.get('/posts', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
  })
}),PostController.index);
routes.delete('/posts/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}),PostController.delete);

/** Profile */
routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), ProfileController.index);

/** Session */
routes.post('/sessions', SessionController.create);
// routes.get('/posts', PostController.index);

module.exports = routes;