const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize('gymplanification', 'root', 'rootroot', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => console.log('Connected to MySQL!'))
    .catch(err => console.error('Unable to connect to the database:', err));

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('../models/users')(sequelize, DataTypes);
db.BodyPart = require('../models/bodyPart')(sequelize, DataTypes);
db.ExerciseDef = require('../models/exerciseDef')(sequelize, DataTypes);
db.ExercisesBodyParts = require('../models/exercisesBodyPart')(sequelize, DataTypes);

module.exports = db;
