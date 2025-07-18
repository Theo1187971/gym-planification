const db = require('../utils/dbConnexion');
const Exercise = db.Exercise;
const ExerciseCategory = db.ExerciseCategory;
const ExerciseDef = db.ExerciseDef
const Workout = db.Workout;
const Session = db.Session;


exports.getAllGymExercises = async (req, res) => {
    try {
        const exercises = await Exercise.findAll({
            include: [
                {
                    model: ExerciseDef,
                    as: 'exerciseDefinition',
                    include: [
                        {
                            model: ExerciseCategory,
                            where: { name: 'Weight exercise' },
                            attributes: []
                        }
                    ],
                    attributes: ['name']
                }
            ],
            attributes: []
        });

        const exerciseNames = exercises
            .filter(e => e.exerciseDefinition && e.exerciseDefinition.name)
            .map(e => e.exerciseDefinition.name);

        res.status(200).json(exerciseNames);
    } catch (error) {
        console.error('Error fetching exercises:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.createWorkoutWithExercises = async (req, res) => {
    const { name, note, sportChoice, exercises, sessionId } = req.body;

    if (!sessionId) {
        return res.status(400).json({ error: 'Session ID is required' });
    }

    try {
        // Vérifie que la session existe et récupère le user_id
        const existingSession = await Session.findOne({
            where: { session_id: sessionId }
        });

        if (!existingSession) {
            return res.status(400).json({ error: "Invalid session ID" });
        }

        const userId = existingSession.user_id;

        // Création du workout
        const workout = await Workout.create({
            name,
            note,
            sport: sportChoice,
            user_id: userId
        });

        // Création des exercices associés au workout
        for (const ex of exercises) {
            const exerciseDef = await ExerciseDef.findOne({ where: { name: ex.name } });

            if (!exerciseDef) {
                console.warn(`Exercise definition not found for: ${ex.name}`);
                continue;
            }

            await Exercise.create({
                workout_id: workout.workout_id,
                exercise_def_id: exerciseDef.exercise_def_id,
                sets: ex.sets,
                reps: ex.reps,
                weight: ex.weight
            });
        }

        res.status(201).json({ message: 'Workout created successfully' });

    } catch (error) {
        console.error('Error creating workout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




