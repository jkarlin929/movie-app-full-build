# Full CRUD of Directors resource

You will be building the full CRUD functionality without step by step instructions. This will be the exact same process as the movies resource. I highly advise follow the exact same development methodology and git workflow as you complete the features for the directors resource. Here are the features you must implement:

1. Directors index - list all directors in the db
2. Directors show page
3. Edit director resource
4. Delete directory resource
5. Create new director resource

The directors table should have at least a `first_name` and a `last_name` column. You can add any other columns you see fit.

Make sure to use a migration file to alter you db and a seed file to fill it with some dummy data.

You can use the following SQL for your directors seed file:

```sql
-- db/seeds/directors.sql

INSERT INTO directors (first_name, last_name) VALUES
  ('Alejandro', 'Iñárritu'),
  ('Damien', 'Chazelle'),
  ('Dan' , 'Gilroy'),
  ('James' , 'Gunn'),
  ('George' , 'Miller'),
  ('Alex' , 'Garland'),
  ('Denis' , 'Villeneuve'),
  ('Yorgos' , 'Lanthimos'),
  ('Stanley' , 'Kubrick'),
  ('Neill' , 'Blomkamp'),
  ('Francis' , 'Ford Coppola'),
  ('Woody' , 'Allen'),
  ('Paul Thomas' , 'Anderson'),
  ('Michael' , 'Powell'),
  ('Martin' , 'Scorsese'),
  ('Quentin' , 'Tarantino'),
  ('Joel' , 'Coen'),
  ('Roman' , 'Polanski'),
  ('Sam' , 'Mendes');
```
