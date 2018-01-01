# User model

We need to set up a user model to store user account info. Create a new migration which will create the users table. We will be using passport so we need to have a `username` and `password_digest` column.

```sql
-- db/migrations/migration-1503764143787.sql

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_digest TEXT NOT NULL
);
```

Make sure to run the migration.

No we have to create the user model.

```javascript
// models/user.js

const db = require('../db/config');

const User = {};

User.findByUserName = userName => {
  return db.oneOrNone(`
    SELECT * FROM users
    WHERE username = $1
  `, [userName]);
};

User.create = user => {
  return db.one(`
    INSERT INTO users
    (username, email, password_digest)
    VALUES ($1, $2, $3)
    RETURNING *
  `, [user.username, user.email, user.password_digest]);
};

module.exports = User;
```

As you can see, our user model only has a `create` and `findByUserName` function. This is because we will not be looking at user profiles or displaying a list of users. We will only be finding a user record when someone tries to sign in. If a user has not yet visited our app, we will allow them to create a user record.

```
git add .
git commit -m "Add user model"
git push
```
