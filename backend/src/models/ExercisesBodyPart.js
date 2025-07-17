const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ExercisesBodyParts extends Model {}

  ExercisesBodyParts.init({
    exercise_def_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    body_part_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  }, {
    sequelize,
    modelName: 'ExercisesBodyParts',
    tableName: 'exercises_body_parts',
    timestamps: false,
  });

  return ExercisesBodyParts;
};
