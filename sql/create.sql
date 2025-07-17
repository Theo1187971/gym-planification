DROP DATABASE IF EXISTS gymplanification;

CREATE DATABASE IF NOT EXISTS gymplanification;
USE gymplanification;

CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username TEXT UNIQUE,
    first_name TEXT,
    last_name TEXT,
    mail TEXT,
    password TEXT
);
 
CREATE TABLE workouts (
    workout_id INT PRIMARY KEY AUTO_INCREMENT,
    name TEXT,
    note TEXT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
 
CREATE TABLE exercises_def (
    exercise_def_id INT PRIMARY KEY AUTO_INCREMENT,
    name TEXT,
    description TEXT
);
 
CREATE TABLE body_parts (
    body_part_id INT PRIMARY KEY AUTO_INCREMENT,
    name TEXT
);
 
CREATE TABLE exercises_body_parts (
    exercise_def_id INT,
    body_part_id INT,
    PRIMARY KEY (exercise_def_id, body_part_id),
    FOREIGN KEY (exercise_def_id) REFERENCES exercises_def(exercise_def_id),
    FOREIGN KEY (body_part_id) REFERENCES body_parts(body_part_id)
);
 
CREATE TABLE exercises (
    exercise_id INT PRIMARY KEY AUTO_INCREMENT,
    note TEXT,
    order_nr INT,
    exercise_def_id INT,
    workout_id INT,
    FOREIGN KEY (exercise_def_id) REFERENCES exercises_def(exercise_def_id),
    FOREIGN KEY (workout_id) REFERENCES workouts(workout_id)
);
 
CREATE TABLE set_types (
    set_type_id INT PRIMARY KEY AUTO_INCREMENT,
    name TEXT
);
 
CREATE TABLE sets (
    set_id INT PRIMARY KEY AUTO_INCREMENT,
    note TEXT,
    set_type_id INT,
    exercise_id INT,
    FOREIGN KEY (set_type_id) REFERENCES set_types(set_type_id),
    FOREIGN KEY (exercise_id) REFERENCES exercises(exercise_id)
);
 
CREATE TABLE time_sets (
    set_id INT PRIMARY KEY,
    minutes INT,
    value INT,
    unit TEXT,
    FOREIGN KEY (set_id) REFERENCES sets(set_id)
);
 
CREATE TABLE weight_sets (
    set_id INT PRIMARY KEY,
    repetitions INT,
    weight FLOAT,
    FOREIGN KEY (set_id) REFERENCES sets(set_id)
);