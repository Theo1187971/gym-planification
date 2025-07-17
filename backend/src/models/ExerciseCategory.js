const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class ExerciseCategory extends Model {
        static associate(models) {
            ExerciseCategory.hasMany(models.ExerciseDef, {
                foreignKey: 'exercise_category_id',
            });
        }
    }

    ExerciseCategory.init({
        exercise_category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'ExerciseCategory',
        tableName: 'exercise_categories',
        timestamps: false,
    });

    return ExerciseCategory;
};

