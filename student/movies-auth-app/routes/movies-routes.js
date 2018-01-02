const express = require('express');
const moviesRouter = express.Router();
const moviesController = require('../controllers/movies-controller');

moviesRouter.get('/', moviesController.index)
moviesRouter.get('/new', moviesController.new)
moviesRouter.get('/:id', moviesController.show)
moviesRouter.get('/:id/edit', moviesController.edit)
moviesRouter.put('/:id', moviesController.update)
moviesRouter.post('/', moviesController.create)
moviesRouter.delete('/:id', moviesController.destroy)

module.exports = moviesRouter;
