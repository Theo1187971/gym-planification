DROP DATABASE IF EXISTS gymplanification;

CREATE DATABASE IF NOT EXISTS gymplanification;
USE gymplanification;

CREATE TABLE users
(
    user_id    INT PRIMARY KEY AUTO_INCREMENT,
    username   VARCHAR(50) UNIQUE,
    first_name VARCHAR(50),
    last_name  VARCHAR(50),
    mail       VARCHAR(100),
    password   VARCHAR(255),
    avatar_url   VARCHAR(255)
);

CREATE TABLE workouts
(
    workout_id INT PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(100),
    note       TEXT,
    user_id    INT,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE exercise_categories
(
    exercise_category_id INT PRIMARY KEY AUTO_INCREMENT,
    name                 TEXT
);

CREATE TABLE exercises_def
(
    exercise_def_id      INT PRIMARY KEY AUTO_INCREMENT,
    name                 TEXT,
    description          TEXT,
    exercise_category_id INT,
    user_id              INT,
    FOREIGN KEY (exercise_category_id) REFERENCES exercise_categories (exercise_category_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE body_parts
(
    body_part_id INT PRIMARY KEY AUTO_INCREMENT,
    name         VARCHAR(50)
);

CREATE TABLE exercises_body_parts
(
    exercise_def_id INT,
    body_part_id    INT,
    PRIMARY KEY (exercise_def_id, body_part_id),
    FOREIGN KEY (exercise_def_id) REFERENCES exercises_def (exercise_def_id),
    FOREIGN KEY (body_part_id) REFERENCES body_parts (body_part_id)
);

CREATE TABLE exercises
(
    exercise_id     INT PRIMARY KEY AUTO_INCREMENT,
    note            TEXT,
    order_nr        INT,
    exercise_def_id INT,
    workout_id      INT,
    FOREIGN KEY (exercise_def_id) REFERENCES exercises_def (exercise_def_id),
    FOREIGN KEY (workout_id) REFERENCES workouts (workout_id)
);

CREATE TABLE set_types
(
    set_type_id INT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(50)
);

CREATE TABLE sets
(
    set_id      INT PRIMARY KEY AUTO_INCREMENT,
    note        TEXT,
    set_type_id INT,
    exercise_id INT,
    FOREIGN KEY (set_type_id) REFERENCES set_types (set_type_id),
    FOREIGN KEY (exercise_id) REFERENCES exercises (exercise_id)
);

CREATE TABLE time_sets
(
    set_id  INT PRIMARY KEY,
    minutes INT,
    value   INT,
    unit    VARCHAR(20),
    FOREIGN KEY (set_id) REFERENCES sets (set_id)
);

CREATE TABLE weight_sets
(
    set_id      INT PRIMARY KEY,
    repetitions INT,
    weight      FLOAT,
    FOREIGN KEY (set_id) REFERENCES sets (set_id)
);

CREATE TABLE sessions
(
    session_id VARCHAR(64) PRIMARY KEY,
    user_id    INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);
