# Movies Edit

We need a route to the edit page for a particular movie. We will use the `id` in the url to lookup the movie in our db so we can render the form the the inputs pre-populated with the current movie data.

```javascript
// routes/movies-routes.js

moviesRouter.get('/:id/edit', moviesController.edit)
```

Now we add the edit action to our controller.

```javascript
// controllers/movies-controller.js

moviesController.edit = (req, res) => {
  Movie.findById(req.params.id)
    .then(movie => {
      res.render('movies/edit', { movie: movie })
    })
    .catch(err => {
      res.status(400).json(err);
    });
};
```

Now we have to create the edit view that is rendered from this action.

```
touch views/movies/edit.ejs
```

```html
<%# views/movies/edit.ejs %>

<h1>Edit a movie</h1>

<form action="<%= `/movies/${movie.id}?_method=PUT` %>" method="POST">
  <label for="title">Title</label>
  <input id="title" type="text" name="title" value="<%= movie.title %>" />

  <br />

  <label for="description">Description</label>
  <input id="description" type="text" name="description" value="<%= movie.description %>" />

  <br />

  <input type="submit" value="Save changes" />
</form>

<a href="<%= `/movies/${movie.id}` %>">Cancel</a>
```

Note the `action` of the form. It is going to `/movies/:id` but it has a query string attached to it with the key-value pair `_method=PUT`. This is because HTML forms can only send GET or POST requests when submitted. However, we know that for updating a record, the HTTP verb we should use is PUT. We will be using a middleware called `method-override` that will look out for these `_method` values in requests made to our app and convert the requests to the appropriate HTTP verb so we can set up out routes and controller in the proper way.

To take advantage of this middleware, we have to set it up in our `app.js`.

```javascript
// app.js

const methodOverride = require('method-override');
app.use(methodOverride('_method'));
```

We also have to tell our app to use the `body-parser` middleware so that form data can be made available to us as javascript objects.

```javascript
// app.js

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
```

Be sure to add these `app.use` calls above all of your routes. Remember, the function call chain happens in the order it is established.

Now we should have everything we need to set up our `update` route and controller action.

```javascript
// routes/movies-routes.js

moviesRouter.put('/:id', moviesController.update)
```

```javascript
// controllers/movies-controller.js

moviesController.update = (req, res) => {
  Movie.update({
      title: req.body.title,
      description: req.body.description
    }, req.params.id)
    .then(() => {
      res.redirect(`/movies/${req.params.id}`)
    })
    .catch(err => {
      res.status(400).json(err);
    });
};
```

And finally, add the update function to our Movie model

```javascript
// models/movie.js

Movie.update = (movie, id) => {
  return db.none(
    `
      UPDATE movies SET
      title = $1,
      description = $2
      WHERE id = $3
    `,
    [movie.title, movie.description, id]
  );
};
```

One last thing we can do it add an edit link to the movies show page for convenience.

```html
<%# views/movies/show.ejs %>

<h1><%= movie.title %></h1>

<p><%= movie.description %></p>

<a href="/movies">Back to movies index</a> |
<a href="<%= `/movies/${movie.id}/edit`%>">Edit movie details</a>
```

Great job!

```
git add .
git commit -m "Add ability to edit movies"
git push
```
