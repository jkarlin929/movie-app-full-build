# Project setup
```
mkdir movies-auth-app
cd movies-auth-app
touch app.js
npm init
```
Follow the installation steps to create your `package.json`.

Now let's add the dependencies we'll be using in the project. _NOTE_: we could certainly add these as we need them later on, but since we know what we're going to use, it's fine to add them up front.

```
npm install --save express ejs morgan method-override body-parser pg-promise
npm install --save-dev nodemon
```
Now let's go into our `package.json` and add a start and a dev script.
```json
// in package.json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```
Let's get a hello world going just to make sure everything is hooked up properly before we start working on features.
```javascript
// app.js
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(PORT, () => {
  console.log(`App is up and running. Listening on port ${PORT}`);
});
```
If we run `npm run dev` and visit `localhost:3000` in our browser, we should see the text 'Hello, world!'.

Finally, we will initialize out git repo.

```
git init
touch .gitignore
echo "node_modules" >> .gitignore
git add .
git commit -m "First commit - setup project"
```

Last think you'll want to do is create a new repo on GitHub and push it up.
