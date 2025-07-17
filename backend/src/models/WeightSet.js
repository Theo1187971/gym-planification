const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class WeightSet extends Model {
        static associate(models) {
            WeightSet.belongsTo(models.Set, {
                foreignKey: 'set_id',
                as: 'set',
            });
        }
    }

    WeightSet.init({
        set_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        repetitions: DataTypes.INTEGER,
        weight: DataTypes.FLOAT,
    }, {
        sequelize,
        modelName: 'WeightSet',
        tableName: 'weight_sets',
        timestamps: false,
    });

    return WeightSet;
};