# Adding director_id to the Movies Table

We know that for a one-to-many relationship to exist between the directors and movies tables, we have to add a foreign key (director_id) to the movies table. We will do this in another migration. Migrations should never be edited after they are run and are intended to be run exactly once.

Remember, to name our migration files, we need to get a timestamp so we can indicate when it was created. Run `Date.now()` in the Chrome console or Node repl to get the current timestamp (mine is ). Then create a new migration file to add the column to movies.

```
touch db/migrations/migration-1503712342203.sql
```

```sql
-- db/migrations/migration-1503712342203.sql

ALTER TABLE movies ADD COLUMN director_id INTEGER;
```

```
psql -d movies_auth_development -f db/migrations/migration-1503712342203.sql
```

Great job!

```
git add .
git commit -m "Add director_id to movies table"
git push
```
