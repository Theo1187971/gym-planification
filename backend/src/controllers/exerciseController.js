
const db = require('../utils/dbConnexion');
const User = db.User;
const BodyPart = db.BodyPart;
const ExerciseDef = db.ExerciseDef;
const ExercisesBodyParts = db.ExercisesBodyParts;

exports.createExercises = async (req, res) => {
  const { exercises, userId } = req.body;

  if (!Array.isArray(exercises) || exercises.length === 0) {
    return res.status(400).json({ message: "No exercises provided" });
  }

  try {
    // Verifying the user exists
    const existingUser = await User.findOne({
        where: { user_id: userId }
      });
    if (!existingUser) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    const results = {
      created: [],
      skipped: [],
      failed: []
    };

    for (const ex of exercises) {
      const { name, description, bodyParts } = ex;

      const existingExercise = await ExerciseDef.findOne({
        where: { name }
      });

      if (existingExercise) {
        results.skipped.push({ name, reason: "Already exists" });
        continue;
      }

      try {
        // Collect all the bodyPart id
        const foundBodyParts = await Promise.all(
          bodyParts.map(bp =>
            BodyPart.findOne({ where: { name: bp } })
          )
        );

        // If bodyParts exist
        if (foundBodyParts.includes(null)) {
          results.failed.push({ name, reason: "One or more bodyParts not found" });
          continue;
        }

        // Exercise creation
        const newExercise = await ExerciseDef.create({
          name,
          description,
          user_id: userId
        });

        // Associations creation
        await Promise.all(
          foundBodyParts.map(bp =>
            ExercisesBodyParts.create({
              exercise_def_id: newExercise.exercise_def_id,
              body_part_id: bp.body_part_id
            })
          )
        );

        results.created.push(newExercise);
      } catch (err) {
        console.error(`Error creating exercise '${name}':`, err);
        results.failed.push({ name, reason: "Unexpected error" });
      }
    }

    return res.status(200).json({
      message: "Exercises processed",
      results
    });
  } catch (error) {
    console.error("Global error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
