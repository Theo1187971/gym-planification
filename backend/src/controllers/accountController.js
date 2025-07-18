    const db = require('../utils/dbConnexion');
    const User = db.User;
    const Session = db.Session;

    exports.getMyAccount = async (req, res) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({message: 'Token missing'});
            }
            const session = await Session.findOne({where: {session_id: token}});
            if (!session) {
                return res.status(401).json({message: 'Invalid session token'});
            }

            const user = await User.findByPk(session.user_id);
            if (!user) return res.status(404).json({message: 'User not found'});

            res.json({
                user_id: user.user_id,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                mail: user.mail,
                avatar_url: user.avatar_url,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Server error: ' + error.message});
        }
    };

    exports.updateMyAccount = async (req, res) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({message: 'Token missing'});
            }
            const session = await Session.findOne({where: {session_id: token}});
            if (!session) {
                return res.status(401).json({message: 'Invalid session token'});
            }
            const user = await User.findByPk(session.user_id);
            if (!user) return res.status(404).json({message: 'User not found'});

            const {first_name, last_name, mail} = req.body;
            const avatar_url = req.file ? `/avatar/${req.file.filename}` : user.avatar_url;

            await user.update({
                first_name: first_name,
                last_name: last_name,
                mail: mail,
                avatar_url: avatar_url
            });

            res.json({message: 'Account updated successfully', avatar_url: avatar_url});
        } catch (err) {
            console.error(err);
            res.status(500).json({message: 'Server error'});
        }
    };

    exports.deleteAccount = async (req, res) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({message: 'Token missing'});
            }
            const session = await Session.findOne({where: {session_id: token}});
            if (!session) {
                return res.status(401).json({message: 'Invalid session token'});
            }
            const user = await User.findByPk(session.user_id);
            if (!user) return res.status(404).json({message: 'User not found'});

            if (!user) {
                return res.status(404).json({message: 'User not found.'});
            }

            const fs = require('fs');
            const path = require('path');
            if (user.avatar_url) {
                const avatarPath = path.join(__dirname, '..', user.avatar_url);
                if (fs.existsSync(avatarPath)) {
                    fs.unlinkSync(avatarPath);
                }
            }
            await user.destroy();

            res.status(200).json({message: 'Account deleted successfully.'});
        } catch (err) {
            console.error('Delete error:', err);
            res.status(500).json({message: 'Error deleting account.'});
        }
    };
