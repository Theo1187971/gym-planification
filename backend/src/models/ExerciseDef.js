const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ExerciseDef extends Model {
    static associate(models) {
        ExerciseDef.belongsTo(models.User, { foreignKey: 'user_id' });
        ExerciseDef.belongsToMany(models.BodyPart, {
            through: 'exercises_body_parts',
            foreignKey: 'exercise_def_id',
            otherKey: 'body_part_id',
        });
        ExerciseDef.belongsTo(models.ExerciseCategory, {
            foreignKey: 'exercise_category_id'
        });
    }
  }

  ExerciseDef.init({
    exercise_def_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ExerciseDef',
    tableName: 'exercises_def',
    timestamps: false,
  });

  return ExerciseDef;
};
