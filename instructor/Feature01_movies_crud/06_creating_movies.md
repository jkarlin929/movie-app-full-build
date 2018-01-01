# Creating Movies

Add the route for the form where the user will enter new movie data. _Note_: this route must appear **above** the `get('/:id')` route. That is because if it is below, when new is visited, the router will think that 'new' is the id of a movie.

```javascript
// routes/movies-routes.js

moviesRouter.get('/new', moviesController.new)
```

Now we add the edit action to our controller.

```javascript
// controllers/movies-controller.js

moviesController.new = (req, res) => {
  res.render('movies/new')
};
```

Now we have to create the new view that is rendered from this action.

```
touch views/movies/new.ejs
```

```html
<%# views/movies/new.ejs %>

<h1>Create a movie</h1>

<form action="/movies" method="POST">
  <label for="title">Title</label>
  <input id="title" type="text" name="title" />

  <br />

  <label for="description">Description</label>
  <input id="description" type="text" name="description" />

  <br />

  <input type="submit" value="Create the movie!" />
</form>

<a href="/movies">Cancel</a>
```

Now we have to set up the POST route, controller action and Model function to save the data that is sent when the form is submitted.

```javascript
// routes/movies-routes.js

moviesRouter.post('/', moviesController.create)
```

```javascript
// controllers/movies-controller.js

moviesController.create = (req, res) => {
  Movie.create({
      title: req.body.title,
      description: req.body.description
    })
    .then(movie => {
      res.redirect(`/movies/${movie.id}`)
    })
    .catch(err => {
      res.status(400).json(err);
    });
};
```

And finally, add the update function to our Movie model

```javascript
// models/movie.js

Movie.create = movie => {
  return db.one(
    `
      INSERT INTO movies
      (title, description)
      VALUES ($1, $2) RETURNING *
    `,
    [movie.title, movie.description]
  );
};
```

Finally, let's add a link on our movies index page to allow users to conveniently access the new movie form.

```html
<%# views/movies/index.ejs %>
<a href="/movies/new">Add a movie!</a>
```

Great job!

```
git add .
git commit -m "Add ability to create movies"
git push
```
