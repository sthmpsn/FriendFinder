DROP DATABASE IF EXISTS y0fr833g2h1g1pcn;   -- Using the Heroku given name

-- Created the DB "friendfiender_db" (only works on local connections)
CREATE DATABASE y0fr833g2h1g1pcn;
USE y0fr833g2h1g1pcn;

-- Created the table "friends" 
CREATE TABLE friends
(
  id int AUTO_INCREMENT NOT NULL,
  name varchar (30) NOT NULL,
  photo varchar(150) NOT NULL,
  q1 int NOT NULL,
  q2 int NOT NULL,
  q3 int NOT NULL,
  q4 int NOT NULL,
  q5 int NOT NULL,
  q6 int NOT NULL,
  q7 int NOT NULL,
  q8 int NOT NULL,
  q9 int NOT NULL,
  q10 int NOT NULL,
  PRIMARY KEY (id)
);

  -- Inserted a set of records into the table
  INSERT INTO friends (name, photo, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10)
  VALUES ("Jerry", "https://vignette.wikia.nocookie.net/rickandmorty/images/f/f1/Jerry_Smith.png/revision/latest?cb=20160923151111",5,1,4,5,1,4,5,1,4,3);
  INSERT INTO friends (name, photo, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10)
  VALUES ("Rick", "http://www.stickpng.com/assets/images/58f37726a4fa116215a92410.png",5,4,3,2,1,6,5,1,4,3);
  INSERT INTO friends (name, photo, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10)
  VALUES ("Morty", "https://cdn.pastemagazine.com/www/articles/morty%20main.jpg",2,3,3,2,1,3,5,1,2,3);
