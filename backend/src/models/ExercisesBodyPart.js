const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const ExercisesBodyParts = sequelize.define('ExercisesBodyParts', {
    exercise_def_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'exercises_def',
        key: 'exercise_def_id'
      }
    },
    body_part_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'body_parts',
        key: 'body_part_id'
      }
    }
  }, {
    tableName: 'exercises_body_parts',
    timestamps: false
  });

  return ExercisesBodyParts;
};
