# Associating Movies and Directors

Now that we have the `director_id` on the movies table, we need to allow users to associate a director to a movie.

To do this we will add a select input to the movies new and edit pages to allow them to pick from all of the directors in our database.

First, we will modify the `moviesController.new` action to query our db for all of the directors and make them available in the `movies/new.ejs` template.

```javascript
// controllers/movies-controller.js

// add to top
const Director = require('../models/director');

moviesController.new = (req, res) => {
  Director.findAll()
    .then(directors => {
      res.render('movies/new', { directors: directors })
    })
    .catch(err => {
      res.status(400).json(err);
    });
};
```

Now we can add a select input to our view which will allow a user to select a director by name. The value of the options will be the director_id, so when the form is submitted, we will have the director id available to create the new movie record.

```html
<%# views/movies/new.ejs %>

<label for="director_id">Director</label>
<select id="director_id" name="director_id">
  <% directors.forEach(director => { %>
    <option value="<%= director.id %>">
      <%= `${director.first_name} ${director.last_name}` %>
    </option>
  <% }) %>
</select>
```

Now we just have to make a small modification to our create actin so we can persist the director_id that is sent along with the rest of the movie data when the form is submitted.

```javascript
// controllers/movies-controller.js

moviesController.create = (req, res) => {
  Movie.create({
      title: req.body.title,
      description: req.body.description,
      director_id: req.body.director_id
    })
    .then(movie => {
      res.redirect(`/movies/${movie.id}`)
    })
    .catch(err => {
      res.status(400).json(err);
    });
};
```

And modify our create function to actually insert the record into postgres with the director_id.

```javascript
// models/movie.js

Movie.create = movie => {
  return db.one(
    `
      INSERT INTO movies
      (title, description, director_id)
      VALUES ($1, $2, $3) RETURNING *
    `,
    [movie.title, movie.description, movie.director_id]
  );
};
```

Now we can show the director on the movies show page! To do this, we are going to modify our movies controller show action.

```javascript
// controllers/movies-controller.js

moviesController.show = (req, res) => {
  Movie.findById(req.params.id)
    .then(movie => {
      if (movie.director_id) {
        Director.findById(movie.director_id)
          .then(director => {
            res.render('movies/show', { movie: movie, director: director })
          })
          .catch(err => {
            res.status(400).json(err);
          });
      } else {
        res.render('movies/show', { movie: movie, director: undefined })
      }
    })
    .catch(err => {
      res.status(400).json(err);
    });
};
```

Once the movie has been found, we're checking to see if it has a director_id. If it does, we will use the Director model to find the director, and then render the show page with both the movies and the director. If the movie has no director_id, we will just render the template with the director set to `undefined`.

Now we can just modify the movies show template to display the directors name if the director is present.

```html
<%# views/movies/show.ejs %>

<% if (director) { %>
  <h4>Directed by: <%= `${director.first_name} ${director.last_name}` %></h4>
<% } %>
```

Great job!

```
git add .
git commit -m "Add director select to movies new page and display director on movies show page"
git push
```

Now we can add the same functionality to editing movies!

```javascript
// controllers/movies-controller.js

moviesController.edit = (req, res) => {
  Movie.findById(req.params.id)
    .then(movie => {
      Director.findAll()
        .then(directors => {
          res.render('movies/edit', { movie: movie, directors: directors })
        })
        .catch(err => {
          res.status(400).json(err);
        });
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

moviesController.update = (req, res) => {
  Movie.update({
      title: req.body.title,
      description: req.body.description,
      director_id: parseInt(req.body.director_id)
    }, req.params.id)
    .then(() => {
      res.redirect(`/movies/${req.params.id}`)
    })
    .catch(err => {
      res.status(400).json(err);
    });
};
```

```javascript
// models/movie.js

Movie.update = (movie, id) => {
  return db.none(
    `
      UPDATE movies SET
      title = $1,
      description = $2,
      director_id = $3
      WHERE id = $4
    `,
    [movie.title, movie.description, movie.director_id, id]
  );
};
```

```html
<%# views/movies/edit.ejs %>

<label for="director_id">Director</label>
<select id="director_id" name="director_id">
  <% directors.forEach(director => { %>
    <option
      value="<%= director.id %>"
      selected="<%= movie.director_id == director.id %>">
      <%= `${director.first_name} ${director.last_name}` %>
    </option>
  <% }) %>
</select>
```

Awesome! Now we can change the director for a movie when we edit it!

```
git add .
git commit -m "Allow user to edit director_id of movie records"
git push
```
