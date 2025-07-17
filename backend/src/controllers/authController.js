const crypto = require('../utils/hash');
const db = require('../utils/dbConnexion');
const User = db.User;


exports.signup = async (req, res) => {
    const {username, firstname, lastname, email, password} = req.body;
    const hashedPassword = crypto.hashPassword(password);

    try {
        const existingUser = await User.findOne({
            where: {
                [db.Sequelize.Op.or]: [{username: username}, {mail: email}]
            }
        });
        if (existingUser) {
            return res.status(400).json({message: 'User with this username or email already exists'});
        }
        const newUser = await User.create({
            username: username, first_name: firstname, last_name: lastname, mail: email, password: hashedPassword,
        });
        res.status(201).json({
            message: 'Account created successfully!', user: {
                id: newUser.user_id, username: newUser.username, email: newUser.mail,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Database error: ' + error.message});
    }
};

exports.login = async (req, res) => {
    const {email, password} = req.body;
    const hashedPassword = crypto.hashPassword(password);

    try {
        const user = await User.findOne({
            where: {
                mail: email, password: hashedPassword,
            }
        });

        if (!user) {
            return res.status(401).json({message: 'Invalid email or password'});
        }

        res.status(200).json({
            message: 'Login successful for ' + email, user: {
                id: user.user_id, username: user.username, email: user.mail,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Database error: ' + error.message});
    }
};