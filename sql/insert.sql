USE gymplanification;

INSERT INTO users (username, first_name, last_name, mail, password) VALUES
    ('user1', 'John', 'Smith', 'user1@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'),
    ('matheoLeBg72', 'Matheo', 'Esquivel', 'matheo@outlook.fr', '2c7580c4cf1907a37161904a5869f026dda5a97e653b64527eb146275b33aca9');

INSERT INTO workouts (name, note, user_id) VALUES
    ('Push', 'Monday Push Workout', 1),
    ('Pull', NULL, 2),
    ('Legs', 'Boring leg day', 1),
    ('Cardio', 'Easy endurance day', 2);

INSERT INTO exercises_def (name, description) VALUES
    ('Bench Press', 'Exercise done with a barbell lying on a flat bench'),
    ('Triceps Pushdown', 'Triceps exercise done using a cable and a bar attachment'),
    ('Lateral Raise', 'Shoulders exercise growing the lateral head of the delts'),
    ('Pull-up', 'Bodyweight exercise targeting the back (can be done using additional weight)'),
    ('Dumbbell Bicep Curl', 'Simple biceps exercise done using two dumbbells'),
    ('Reverse Fly', 'Exercise to be done using a cable to grow the rear delts'),
    ('Squat', 'Exercise which targets the quadriceps. To be done with a barbell'),
    ('Leg curl', 'Machine exercise targeting the hamstrings'),
    ('Calf raise', 'Exercise to grow the calves. Can be done using Smith machine or dumbbells'),
    ('Biking', 'Endurance exercise using a bike'),
    ('Running', 'Cardio exercise requiring to have legs and shoes');

INSERT INTO body_parts (name) VALUES
    ('Chest'),
    ('Back'),
    ('Legs'),
    ('Shoulders'),
    ('Arms'),
    ('Cardio');

INSERT INTO exercises_body_parts VALUES
    (1, 1),
    (2, 5),
    (3, 4),
    (4, 2),
    (5, 5),
    (6, 4),
    (7, 3),
    (8, 3),
    (9, 3),
    (10, 6),
    (10, 3),
    (11, 6);

INSERT INTO exercises (note, order_nr, exercise_def_id, workout_id) VALUES
    (NULL, 1, 1, 1),
    (NULL, 2, 2, 1),
    (NULL, 3, 3, 1),
    ("Was hard today", 1, 4, 2),
    (NULL, 2, 5, 2),
    (NULL, 3, 6, 2),
    ("Felt light", 1, 7, 3),
    ("Had a cramp", 2, 8, 3),
    ("Tore my achilles", 3, 9, 3),
    ("Low intensity", 1, 10, 4);


INSERT INTO set_types (name) VALUES
    ("Warm Up"),
    ("Drop Set"),
    ("Working Set");

INSERT INTO sets (note, set_type_id, exercise_id) VALUES
    (NULL, 1, 1),
    (NULL, 3, 1),
    (NULL, 3, 2),
    (NULL, 2, 2),
    (NULL, 3, 3),
    (NULL, 3, 4),
    (NULL, 3, 5),
    (NULL, 1, 6),
    (NULL, 3, 7),
    (NULL, 3, 8),
    (NULL, 3, 9),
    (NULL, 3, 10),
    (NULL, 3, 10);

INSERT INTO weight_sets (set_id, repetitions, weight) VALUES
    (1, 12, 42.5),
    (2, 8, 70.0),
    (3, 15, 25.0),
    (4, 12, 20.0),
    (5, 10, 6.0),
    (6, 8, 0.0),
    (7, 10, 12.5),
    (8, 10, 5.0),
    (9, 6, 90.0),
    (10, 10, 25.0),
    (11, 4, 20.0);

INSERT INTO time_sets (set_id, minutes, value, unit) VALUES
    (12, 20, 120, 'Watts'),
    (13, 10, 5, 'km');