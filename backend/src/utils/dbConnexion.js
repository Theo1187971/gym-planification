require('dotenv').config();

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize('gymplanification', process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
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
db.ExercisesBodyParts = require('../models/ExercisesBodyParts')(sequelize, DataTypes);
db.ExerciseCategory = require('../models/ExerciseCategory')(sequelize, DataTypes);
db.Exercise = require('../models/Exercise')(sequelize, DataTypes);
db.Workout = require('../models/Workout')(sequelize, DataTypes);
db.Set = require('../models/Set')(sequelize, DataTypes);
db.WeightSet = require('../models/WeightSet')(sequelize, DataTypes);
db.TimeSet = require('../models/TimeSet')(sequelize, DataTypes);
db.SetType = require('../models/SetType')(sequelize, DataTypes);
db.Session = require('../models/Session')(sequelize, DataTypes);

// Associations
Object.values(db).forEach(model => {
    if (model.associate) {
        model.associate(db);
    }
});

module.exports = db;
