# Deleting Movies

Add the delete "link" to the movies show page. Remember, links can only send GET requests and HTML forms can only send GET or POST requests. We want a DELETE request, so we are going to use a form and leverage our friend, `method-override`.

```html
<%# views/movies/show.ejs %>

<h1><%= movie.title %></h1>

<p><%= movie.description %></p>

<a href="/movies">Back to movies index</a> |

<a href="<%= `/movies/${movie.id}/edit`%>">Edit movie details</a> |

<form action="<%= `/movies/${movie.id}?_method=DELETE` %>" method="POST">
  <input type="submit" value="Delete" />
</form>
```

Now for the route, controller action and model function.

```javascript
// routes/movies-routes.js

moviesRouter.delete('/:id', moviesController.destroy)
```

```javascript
// controllers/movies-controller.js

moviesController.destroy = (req, res) => {
  Movie.destroy(req.params.id)
    .then(() => {
      res.redirect('/movies')
    })
    .catch(err => {
      res.status(400).json(err);
    });
};
```

```javascript
// models/movie.js

Movie.destroy = id => {
  return db.none(
    `
      DELETE FROM movies
      WHERE id = $1
    `,
    [id]
  );
};
```

Great job!

```
git add .
git commit -m "Add ability to delete movies"
git push
```
