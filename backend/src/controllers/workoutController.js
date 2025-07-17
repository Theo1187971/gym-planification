const db = require('../utils/dbConnexion');
const Workout = db.Workout;
const Exercise = db.Exercise;
const ExerciseDef = db.ExerciseDef;
const Set = db.Set;
const WeightSet = db.WeightSet;
const TimeSet = db.TimeSet;
const SetType = db.SetType;

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