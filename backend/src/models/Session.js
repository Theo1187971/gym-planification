module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define("Session", {
        session_id: {
            type: DataTypes.STRING(64),
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        expires_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: "sessions",
        timestamps: false
    });

    Session.associate = (models) => {
        Session.belongsTo(models.User, {
            foreignKey: "user_id",
            onDelete: "CASCADE"
        });
    };

    return Session;
};
