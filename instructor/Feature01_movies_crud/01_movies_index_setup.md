# Movies index

Modify your `app.js` to use EJS as the view engine and also use a `moviesRouter` for requests to `/movies`.

```javascript
// app.js

// add at top
const path = require('path')

// add below
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const moviesRouter = require('./routes/movies-routes');
app.use('/movies', moviesRouter)
```

Now create your routes directory and your `movies-routes.js` file.

```
mkdir routes
touch routes/movies-routes.js
```

Add your movieRouter code.

```javascript
// routes/movies-routes.js

const express = require('express');
const moviesController = require('../controllers/movies-controller');
const moviesRouter = express.Router();

moviesRouter.get('/', moviesController.index)

module.exports = moviesRouter;
```

As you can tell from this code, we need to add a controller which will handle all requests to our movies routes.

```
mkdir controllers
touch controllers/movies-controller.js
```

And add your controller code.

```javascript
// controllers/movies-controller.js

module.exports = {
  index: (req, res) => {
    res.render('movies/index')
  }
};
```

As you can see from this controller index action, we need to set up our views and create our movies index ejs template.

```
mkdir -p views/movies
touch views/movies/index.ejs
```

For now we can just fill it in with an h1

```html
<%# views/movies/index.ejs %>

<h1>All the movies</h1>
```

Now when we visit localhost:3000/movies we should see 'All the movies'!

We still need to set up our db and Movie model, but our app is functioning now with no bugs or errors. This looks like a good milestone and it would be very wise to commit here.

```
git add .
git commit -m "Initial setup of movies index"
git push
```
