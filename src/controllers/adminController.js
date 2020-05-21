const database = require('../services/database');
const jwt = require('../services/authToken');

module.exports = {
    async auth(req, res) {
        const { username, password } = req.body;
        if(!username || !password) return res.status(500).json({ error: "Dados informados insuficientes" });
        const data = await database.findAdmin(username);
        if(!data[0]) return res.status(500).json({ error: "Usuário ou senha inválidos." });
        const admpasswd = data[0].password;
        if(password != admpasswd) return res.status(200).json({ error: "Usuário ou senha inválidos." });
        const user = data[0];
        user.password = undefined;

        return res.status(200).json({ user, token: jwt.createUserToken(user.cd_usuario) });
    }
}