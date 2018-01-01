const express = require('express');
const moviesRouter = express.Router();
const moviesController = require('../controllers/movies-controller');

moviesRouter.get('/', moviesController.index)
moviesRouter.get('/:id', moviesController.show)
moviesRouter.get('/:id/edit', moviesController.edit)
moviesRouter.put('/:id', moviesController.update)

module.exports = moviesRouter;
