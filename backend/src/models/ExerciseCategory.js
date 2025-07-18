
module.exports = (sequelize, DataTypes) => {
  const ExerciseCategory = sequelize.define('ExerciseCategory', {
    exercise_category_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'exercise_categories',
    timestamps: false
  });

  ExerciseCategory.associate = (models) => {
    ExerciseCategory.hasMany(models.ExerciseDef, {
      foreignKey: 'exercise_category_id'
    });
  };

  return ExerciseCategory;
};