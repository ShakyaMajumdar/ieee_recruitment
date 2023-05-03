CREATE DATABASE ieee_recruitment;

\c ieee_recruitment;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  ieee_id VARCHAR(30) NOT NULL,
  college VARCHAR(30) NOT NULL,
  year VARCHAR(5) NOT NULL,
  team VARCHAR(10) NOT NULL,
  email VARCHAR(30) NOT NULL,
  skills VARCHAR(250) NOT NULL
);
