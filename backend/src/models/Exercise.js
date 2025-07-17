const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Exercise extends Model {
        static associate(models) {
            Exercise.belongsTo(models.ExerciseDef, {
                foreignKey: 'exercise_def_id',
                as: 'exerciseDefinition',
            });

            Exercise.belongsTo(models.Workout, {
                foreignKey: 'workout_id',
                as: 'workout',
            });

            Exercise.hasMany(models.Set, {
                foreignKey: 'exercise_id',
                as: 'sets',
            });
        }
    }

    Exercise.init({
        exercise_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        note: DataTypes.TEXT,
        order_nr: DataTypes.INTEGER,
        exercise_def_id: DataTypes.INTEGER,
        workout_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Exercise',
        tableName: 'exercises',
        timestamps: false,
    });

    return Exercise;
};