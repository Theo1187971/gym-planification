const db = require('../utils/dbConnexion');
const Workout = db.Workout;
const Exercise = db.Exercise;
const ExerciseDef = db.ExerciseDef;
const Set = db.Set;
const WeightSet = db.WeightSet;
const TimeSet = db.TimeSet;
const SetType = db.SetType;
const ExerciseCategory = db.ExerciseCategory;

exports.getWorkout = async (req, res) => {
    const workoutId = req.params.workout_id;


    try {
        const workout = await Workout.findByPk(workoutId, {
            include: [
                {
                    model: Exercise,
                    as: 'exercises',
                    include: [
                        {
                            model: ExerciseDef,
                            as: 'exerciseDefinition',
                            include: [
                                { model: ExerciseCategory, as: "exerciseCategory"}
                            ]
                        },
                        {
                            model: Set,
                            as: 'sets',
                            include: [
                                { model: WeightSet, as: 'weightSet' },
                                { model: TimeSet, as: 'timeSet' },
                                { model: SetType, as: 'setType' }
                            ]
                        }
                    ]
                }
            ]
        });

        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }

        res.json(workout);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};


exports.getWorkouts = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    try {
        const session = await db.Session.findOne({ where: { session_id: token } });

        if (!session) {
            return res.status(401).json({ message: 'Invalid session token' });
        }

        const user = await db.User.findOne({ where: { user_id: session.user_id } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const workouts = await Workout.findAll({
            where: { user_id: user.user_id },
            include: [
                {
                    model: Exercise,
                    as: 'exercises',
                    include: [
                        {
                            model: ExerciseDef,
                            as: 'exerciseDefinition',
                            include: [
                                { model: ExerciseCategory, as: 'exerciseCategory' }
                            ]
                        },
                        {
                            model: Set,
                            as: 'sets',
                            include: [
                                { model: WeightSet, as: 'weightSet' },
                                { model: TimeSet, as: 'timeSet' },
                                { model: SetType, as: 'setType' }
                            ]
                        }
                    ]
                }
            ]
        });

        res.json(workouts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
