const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Set extends Model {
        static associate(models) {
            Set.belongsTo(models.SetType, {
                foreignKey: 'set_type_id',
                as: 'setType',
            });

            Set.belongsTo(models.Exercise, {
                foreignKey: 'exercise_id',
                as: 'exercise',
            });

            Set.hasOne(models.TimeSet, {
                foreignKey: 'set_id',
                as: 'timeSet',
            });

            Set.hasOne(models.WeightSet, {
                foreignKey: 'set_id',
                as: 'weightSet',
            });
        }
    }

    Set.init({
        set_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        note: DataTypes.TEXT,
        set_type_id: DataTypes.INTEGER,
        exercise_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Set',
        tableName: 'sets',
        timestamps: false,
    });

    return Set;
};
