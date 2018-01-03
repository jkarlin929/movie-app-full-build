const db = require('../db/config');

const Movie = {};

Movie.findAll = () => {
  return db.query('SELECT * FROM movies ORDER BY id DESC');
}

Movie.findById = (id) => {
  // console.log(db)
  return db.oneOrNone(`SELECT * FROM movies WHERE id = $1`, [id])
}

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

Movie.destroy = id => {
  return db.none(
    `
      DELETE FROM movies
      WHERE id = $1
    `,
    [id]
  );
}

module.exports = Movie;