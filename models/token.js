const jwt = require('jsonwebtoken');

module.exports = {
    refreshToken(user) {
        return jwt.sign({ uuid: user.uuid }, 'a1b1c1', {
            expiresIn: 600 //Expires in 10 min
        });
    }
}