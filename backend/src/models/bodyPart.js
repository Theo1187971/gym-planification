const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class BodyPart extends Model {
    static associate(models) {
      BodyPart.belongsToMany(models.ExerciseDef, {
        through: models.ExercisesBodyParts,
        foreignKey: 'body_part_id',
        otherKey: 'exercise_def_id',
      });
    }
  }

  BodyPart.init({
    body_part_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'BodyPart',
    tableName: 'body_parts',
    timestamps: false,
  });

  return BodyPart;
};
