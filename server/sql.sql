CREATE DATABASE barber;



CREATE TABLE booth (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    date DATE,
    start_time TIME,
    end_time TIME,
    email VARCHAR(255),
    phone VARCHAR(255),
    price INT
);

CREATE TABLE pass(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255)
);