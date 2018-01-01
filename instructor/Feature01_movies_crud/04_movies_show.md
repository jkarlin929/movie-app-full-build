# Movies Show Page

Let's start with the route.

```javascript
// routes/movies-routes.js

moviesRouter.get('/:id', moviesController.show)
```

Now the controller action.

```javascript
// controllers/movies-controller.js

moviesController.show = (req, res) => {
  Movie.findById(req.params.id)
    .then(movie => {
      res.render('movies/show', { movie: movie })
    })
    .catch(err => {
      res.status(400).json(err);
    });
};
```

We have two tasks to complete now: create the movies show template, and impliment the `findById` function on our Movie model. Let's start with the model.

```javascript
// models/movie.js

Movie.findById = id => {
  return db.oneOrNone(`SELECT * FROM movies WHERE id = $1`, [id]);
};
```

Now for the show view

```
touch views/movies/show.ejs
```

```html
<%# views/movies/show.ejs %>

<h1><%= movie.title %></h1>

<p><%= movie.description %></p>

<a href="/movies">Back to movies index</a>
```

The show page should work now. Great job!

```
git add .
git commit -m "Add movies show page"
git push
```
