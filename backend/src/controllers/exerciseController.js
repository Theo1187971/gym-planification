
const db = require('../utils/dbConnexion');
const Session = db.Session;
const BodyPart = db.BodyPart;
const ExerciseDef = db.ExerciseDef;
const ExercisesBodyParts = db.ExercisesBodyParts;
const ExerciseCategory = db.ExerciseCategory;

exports.createExercises = async (req, res) => {
  const { exercises, sessionId } = req.body;

  if (!Array.isArray(exercises) || exercises.length === 0) {
    return res.status(400).json({ message: "No exercises provided" });
  }

  try {
    // Verifying the session exists
    const existingSession = await Session.findOne({
        where: { session_id: sessionId }
      });
    if (!existingSession) {
      return res.status(400).json({ message: "Session doesn't exist" });
    }

    const results = {
      created: [],
      skipped: [],
      failed: []
    };

    for (const ex of exercises) {
      const { name, description, bodyParts, categoryName } = ex;

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

        const foundExerciseCategory = await ExerciseCategory.findOne({
            where: { name : categoryName }
        });

        if(!foundExerciseCategory) {
            results.skipped.push({ name, reason: "Category doesn't exist" });
            continue;
        }

        // Exercise creation
        const newExercise = await ExerciseDef.create({
          name,
          description,
          exercise_category_id: foundExerciseCategory.exercise_category_id,
          user_id: existingSession.user_id

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
    return res.status(500).json({ error: error,message: "Internal server error" });
  }
};
