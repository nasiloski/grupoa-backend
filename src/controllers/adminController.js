const database = require('../services/database');

module.exports = {
    async auth(req, res) {
        const { username, password } = req.body;
        if(!username || !password) return res.status(500).json({ error: "Dados informados insuficientes" });
        const data = await database.findAdmin(username);
        if(!data[0]) return res.status(500).json({ error: "Usuário ou senha inválidos." });
        const admpasswd = data[0].password;
        if(password != admpasswd) return res.status(200).json({ error: "Usuário ou senha inválidos." });
        return res.status(200).json({ message: "Usuário autenticado." })

    }
}