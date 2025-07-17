const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class SetType extends Model {
        static associate(models) {
            SetType.hasMany(models.Set, {
                foreignKey: 'set_type_id',
                as: 'sets',
            });
        }
    }

    SetType.init({
        set_type_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.STRING(50),
    }, {
        sequelize,
        modelName: 'SetType',
        tableName: 'set_types',
        timestamps: false,
    });

    return SetType;
};
