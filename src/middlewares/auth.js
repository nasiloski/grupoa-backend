const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token_headers = req.headers.authorization;
    jwt.verify(token_headers, process.env.TOKENPASSWD, (err, decoded) => {
        if(err) return res.status(500).json({ error: "Token não informado" });
        return next();
    })
}
module.exports = auth;