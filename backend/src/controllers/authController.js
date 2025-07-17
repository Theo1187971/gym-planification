const crypto = require("../utils/hash");
const db = require("../utils/dbConnexion");

exports.signup = (req, res) => {
    const {username, firstname, lastname, email, password} = req.body;
    const hashedPassword = crypto.hashPassword(password);

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) return res.status(500).json({message: 'Database error ' + err});
        if (results.length > 0) {
            return res.status(400).json({message: 'User already exists'});
        }

        db.query(
            'INSERT INTO users (username,first_name, last_name, mail, password) VALUES (?, ?, ?, ?, ?)',
            [username, firstname, lastname, email, hashedPassword],
            (err2) => {
                if (err2) return res.status(500).json({message: 'Insertion error ' + err2});

                res.status(200).json({
                    message: 'Account created successfully ! \n' +
                        'FirstName :' + firstname + ', Lastname' + lastname +
                        ', Email' + email + ', Username' + username
                        + ', Password:' + hashedPassword + '});'
                });
            }
        );
    });
}
exports.login = (req, res) => {
    const {email, password} = req.body;
    const hashedPassword = crypto.hashPassword(password);

    db.query(
        'SELECT * FROM users WHERE mail = ? AND password = ?',
        [email, hashedPassword],
        (err, results) => {
            if (err) return res.status(500).json({message: 'Database error'});

            if (results.length === 0) {
                return res.status(401).json({message: 'Invalid email or password'});
            }

            res.status(200).json({message: 'Login successful for ' + email});
        }
    );
};