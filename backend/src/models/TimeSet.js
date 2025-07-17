const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class TimeSet extends Model {
        static associate(models) {
            TimeSet.belongsTo(models.Set, {
                foreignKey: 'set_id',
                as: 'set',
            });
        }
    }

    TimeSet.init({
        set_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        minutes: DataTypes.INTEGER,
        value: DataTypes.INTEGER,
        unit: DataTypes.STRING(20),
    }, {
        sequelize,
        modelName: 'TimeSet',
        tableName: 'time_sets',
        timestamps: false,
    });

    return TimeSet;
};