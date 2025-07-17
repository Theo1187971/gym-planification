const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize('gymplanification', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => console.log('Connected to MySQL!'))
    .catch(err => console.error('Unable to connect to the database:', err));

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('../models/Users')(sequelize, DataTypes);
db.BodyPart = require('../models/BodyPart')(sequelize, DataTypes);
db.ExerciseDef = require('../models/ExerciseDef')(sequelize, DataTypes);
db.ExercisesBodyParts = require('../models/ExercisesBodyPart')(sequelize, DataTypes);

module.exports = db;
