const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Workout extends Model {
        static associate(models) {
            // A Workout belongs to a User
            Workout.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'user',
            });

            // A Workout has many Exercises
            Workout.hasMany(models.Exercise, {
                foreignKey: 'workout_id',
                as: 'exercises',
            });
        }
    }

    Workout.init({
        workout_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        note: {
            type: DataTypes.TEXT,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Workout',
        tableName: 'workouts',
        timestamps: false,
    });

    return Workout;
};
