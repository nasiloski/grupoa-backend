const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token_headers = req.headers.authorization;
    jwt.verify(token_headers, process.env.TOKENPASSWD, (err, decoded) => {
        if(err) return res.status(403).json({ error: "Necessária autenticação!" });
        return next();
    })
}
module.exports = auth;