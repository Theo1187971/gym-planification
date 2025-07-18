const db = require('../utils/dbConnexion');
const Exercise = db.Exercise;
const ExerciseCategory = db.ExerciseCategory;
const ExerciseDef = db.ExerciseDef
const Workout = db.Workout;
const Session = db.Session;
const WeightSet = db.WeightSet;
const Set = db.Set;


exports.getAllGymExercises = async (req, res) => {
    try {
        const exercises = await ExerciseDef.findAll({
            include: [
                {
                    model: ExerciseCategory,
                    as: "exerciseCategory",
                    where: { name: 'Weight exercise' },
                    attributes: []
                }
            ],
            attributes: ['name']
        });

        const exerciseNames = exercises
            .map(e => e.name);

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
        const existingSession = await Session.findOne({
            where: { session_id: sessionId }
        });

        if (!existingSession) {
            return res.status(400).json({ error: "Invalid session ID" });
        }

        const userId = existingSession.user_id;

        const workout = await Workout.create({
            name,
            note,
            sport: sportChoice,
            user_id: userId
        });

        for (const ex of exercises) {
            const exerciseDef = await ExerciseDef.findOne({ where: { name: ex.name } });

            if (!exerciseDef) {
                console.warn(`Exercise definition not found for: ${ex.name}`);
                continue;
            }

            const createdExercise = await Exercise.create({
                workout_id: workout.workout_id,
                exercise_def_id: exerciseDef.exercise_def_id,
            });

            for (const set of ex.sets) {
                const createdSet = await Set.create({
                    set_type_id: 3,
                    exercise_id: createdExercise.exercise_id
                });

                await WeightSet.create({
                    set_id: createdSet.set_id,
                    repetitions: set.repetitions,
                    weight: set.weight
                })
            }
        }

        res.status(201).json({ message: 'Workout created successfully' });

    } catch (error) {
        console.error('Error creating workout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




