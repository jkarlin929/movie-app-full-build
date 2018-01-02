const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');


// middleware
app.use(methodOverride('_method'))
//app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


const PORT = process.env.PORT || 3001;

// configure ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
// console.log("this is __dirname; ", __dirname)

app.get('/', (req,res) => {
  res.send('hello my young budding developers in the making...')
})

// all routes need to be placed before the * route
const moviesRouter = require('./routes/movies-routes');
app.use('/movies', moviesRouter);

app.get('*', (req,res) => {
  res.status(404).send('not sure what your looking but it aint there')
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})


