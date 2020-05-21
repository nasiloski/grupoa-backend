const jwt = require('jsonwebtoken');

module.exports = {
    createUserToken(userId){
        return jwt.sign({ id: userId }, process.env.TOKENPASSWD, { expiresIn: '30d' });
    }
}