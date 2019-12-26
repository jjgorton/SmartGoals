const jwt = require('jsonwebtoken');

const secrets = process.env.JWT_SECRET;

module.exports = {
    generateToken
};

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    };

    const options = {
        expiresIn: '1d'
    };

    return jwt.sign(payload, secrets, options);
}
