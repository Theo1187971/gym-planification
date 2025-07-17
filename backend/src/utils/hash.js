const crypto = require('crypto');

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

function generateSessionToken() {
    return crypto.createHash("sha256").update(crypto.randomBytes(64)).digest("hex");
}

module.exports = {hashPassword, generateSessionToken};
