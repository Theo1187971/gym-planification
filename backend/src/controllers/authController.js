const users = require("../models/users");

exports.signup = (req, res) => {
    const {name, email, password} = req.body;
    if (users[name]) {
        return res.status(400).send({message: `User with this username already exists`});
    }
    if (users[email]) {
        return res.status(400).send({message: `User with this email already exists`});
    }
    users[name] = {
        name: name,
        email: email,
        password: password // plus tard, ici on mettra le hash
    };


    return res.status(200).json({
        message: 'Account created successfully ! \n' +
            'Username :' + users[email].name + ', Email' + users[email].email + ', Password:' + users[email].password + '});'
    });
}
exports.login = (req, res) => {
    const {email, password} = req.body;

    if (!users[email] || users[email].password !== password) {
        return res.status(401).json({message: 'Invalid email or password'});
    }

    return res.status(200).json({message: 'Login successful'});
};