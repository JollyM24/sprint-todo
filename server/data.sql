CREATE DATABASE agileproject;

CREATE TABLE project (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    sprints INT,
    deadline date
) ;

CREATE TABLE tasks (
    id INT PRIMARY KEY,
    title VARCHAR(255),
    descr VARCHAR(300),
    task_status INT,
    priority INT,
    sprint INT
);

CREATE TABLE sprints (
    id SERIAL PRIMARY KEY,
    start_date date,
    end_date date,
    task_count INT
);

CREATE TABLE score (
    id SERIAL PRIMARY KEY,
    ddate date,
    done INT,
    sprint_id INT REFERENCES sprints (id)
);

CREATE TABLE types (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	colorcode VARCHAR(7)
);