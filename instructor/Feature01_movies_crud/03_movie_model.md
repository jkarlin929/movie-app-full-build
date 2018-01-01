# Create the Movie model

Now that we have our movies table, we can use PG-Promise to connect to it.

First we have to set up our db config for pg-promise.

```
touch db/config.js
```

```javascript
const options = {
  receive: (data, result, e) => {
    console.log(e.query);
  },
  query: (e) => {
    console.log(e.query);
  },
};

const pgp = require('pg-promise')(options);

function setDatabase() {
  if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
    return pgp({
      database: 'movies_auth_development',
      port: 5432,
      host: 'localhost'
    });
  } else if (process.env.NODE_ENV === 'production') {
    return pgp(process.env.DATABASE_URL);
  }
}

const db = setDatabase();

module.exports = db;
```

Now we can create our model

```
mkdir models
touch models/movie.js
```

```javascript
// models/movie.js

const db = require('../db/config');

const Movie = {};

Movie.findAll = () => {
  return db.query('SELECT * FROM movies ORDER BY id ASC');
};

module.exports = Movie;
```

Now we can use our model in our controller to query the db for all the movies and make them available for rendering in the index view. (I will also take this opportunity to refactor the controller a bit)

```javascript
// controllers/movies-controller.js

const Movie = require('../models/movie');

const moviesController = {};

moviesController.index = (req, res) => {
  Movie.findAll()
    .then(movies => {
      res.render('movies/index', { movies: movies });
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

module.exports = moviesController;
```

And now we can render them in the view!

```html
<%# views/movies/index.ejs %>

<h1>All the movies</h1>

<% movies.forEach(movie => { %>
  <div class="movie">
    <h4>
      <a href="<%= `/movies/${movie.id}` %>">
        <%= movie.title %>
      </a>
    </h4>
    <p><%= movie.description %></p>
  </div>
<% }) %>
```

Now when we visit `localhost:3000/movies` we can see our list of movies! (You might have to restart your server).

Next we will be adding a movie show page so the links we just added on our index page actually go somewhere 😉. But before we do that, lets:

```
git add .
git commit -m "Add movie model and render movie records in movies index page"
git push
```
