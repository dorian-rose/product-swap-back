
--CREATE USER (REGISTERED USER) TABLE--
CREATE TABLE users (
  email         VARCHAR(100) NOT NULL UNIQUE PRIMARY KEY,
  name     VARCHAR(50) NOT NULL,
  id       VARCHAR(50) NOT NULL
);


-- TEST DATA FOR USERS 
INSERT INTO users(email, name, id)
VALUES
('jose@correo.es', 'jose garcia', '23tughgfds'), --in the case of this app, generated by auth0
('isa@correo.es','isa gomez', '23tughgfds')


--CREATE ENTRIES TABLE --
CREATE TABLE entries (
  id_entry serial NOT NULL PRIMARY KEY, 
  title varchar(100) NOT NULL UNIQUE, 
  description varchar(255) NOT NULL,
  image varchar(255),
  date date DEFAULT CURRENT_DATE,
  email varchar(100) NOT NULL,
  category varchar(15),
 claimed boolean,
  FOREIGN KEY (email) REFERENCES users(email)
);


-- TEST DATA ENTRIES 
INSERT INTO entries(title,description, image, email, category, claimed)
VALUES 
('watch', 'Vintage gold wristwatch','image1', 'isa@correo.es','accessories', 'no'),
('shoes', 'Brown leather shoes','image2', 'ana@correo.es','shoes', 'no')


--CREATE ROLES TABLE --
CREATE TABLE roles (
  email         VARCHAR(100) NOT NULL UNIQUE PRIMARY KEY,
  role          VARCHAR(50) NOT NULL,
FOREIGN KEY (email) REFERENCES users(email)
);

-- TEST DATA ROLES
INSERT INTO roles(email, role)
VALUES 
('isa@correo.es','user'),
('ana@correo.es','user')


--CREATE TEXTS TABLE --
--Text descriptions for product categories --
CREATE TABLE texts (
  id_entry serial NOT NULL PRIMARY KEY,  
  description text NOT NULL,
  image varchar(255),
  category varchar(15) NOT NULL
);


-- TEST DATA TEXTS
INSERT INTO texts(description, category)
VALUES 
('description category1','category1'),
('description category2','category2')