# Deploying our app to Heroku

### Create a Heroku accound and install the Heroku CLI

[Instructions here](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)

### Create a new app on Heroku

This step is also in the getting started guide, but just to recap: you have to run the

```
heroku create
```

command from the root of your project directory. This will create a new remote reference in git to the Heroku server.

Now lets run:

```
git push heroku master
```

Congrats! You app code has been pushed up to Heroku. If you run

```
heroku open
```

in your terminal, it will open up a browser page to your deployed app. You will notice however that the app is broken. That's because we have to set up our database, run our migrations on our production database, and set up our production env vars.

### Provision a production DB

Also in the [getting started guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs#provision-a-database), but to recap:

```
heroku addons:create heroku-postgresql:hobby-dev
```

Now we have our production instance of Postgressql, but it's empty. Don't worry, we have to run our migrations. We have to do this in a slightly different fashion than we do on our dev db.

We're going to connect to our prod db directly by running:

```
heroku pg:psql
```

Now we can run the migrations from within the Heroku psql console. To run a migration, we can just use `\i`. Your command will look something like this (only with a different migration timestamp):

```sql
\i db/migrations/migration-1503681175400.sql;
```

After running all of my migrations, I had something that looked like this:

```
guarded-hamlet-15645::DATABASE=> \i db/migrations/migration-1503681175400.sql;
CREATE TABLE
guarded-hamlet-15645::DATABASE=> \i db/migrations/migration-1503710806094.sql;
CREATE TABLE
guarded-hamlet-15645::DATABASE=> \i db/migrations/migration-1503712111915.sql;
ALTER TABLE
guarded-hamlet-15645::DATABASE=> \i db/migrations/migration-1503764143787.sql;
CREATE TABLE
```

Then you can just `\q` to quit out of the console.

### Setting up config variables

Remember when we were setting up user auth and we had to create a `.env` file to hold onto our `SESION_KEY` environment variable? We need to have a variable of the same name on our production machine. Setting env vars is very simple in Heroku.

We can do it right on the command line via the Heroku CLI. [Check it out](https://devcenter.heroku.com/articles/getting-started-with-nodejs#define-config-vars)

Heroku also lets us set config vars through the web app. Go to your Heroku dashboard and select your app. Click on the `Settings` tab and then click the button "Reveal Config Vars". You can CRUD all of the config vars for your production server here.

## Making changes

Remember, your Heroku app is just another remote repository. That means all you have to do to update your production code is push! Your workflow might look something like this after you've set up your app on Heroku:

```
git add .
git commit -m "Finish awesome feature"
git push origin master
git push heroku master
```

**Just remember:** if you make changes to your database through a migration, you have to run that migration on your production db.
