const database = require("../services/database");

module.exports = {
    async store(req, res) {
        const { name, email, ra, cpf } = req.body;
        if(!name || !email || !ra || !cpf) return res.status(500).json({ error: "Dados insuficientes" });
        try {
            let data = await database.findByRa(ra);
            if(data.length > 0) return res.status(500).json({ error: "Ra informada já está cadastrada" });
            data = await database.create(name, email, ra, cpf);
            return res.status(200).json({ message: "Aluno cadastrado com sucesso." });

        } catch (err) {
            console.log(`MySQL: Erro no banco de dados:${err}`);
            return res.status(500).json({ error: "Erro interno" });
        }
    },

    async show (req, res) {
        try {
            const data = await database.findAll();
            if(data.length === 0) return res.status(500).json({ message: "Não existem usuários cadastrados" });
            return res.status(200).json(data);

        } catch (err) {
            console.log(`MySQL: Erro no banco de dados:${err}`)
            return res.status(500).json({ error: "Erro interno" });
        }
    },

    async destroy (req, res) {
        const { ra } = req.params;
        if(!ra) return res.status(500).json({ error: "Dados insuficientes" });
        try {
            const data = await database.deleteByRa(ra);
            return res.status(200).json({ message: "Aluno deletado com sucesso." });

        } catch (err) {
            console.log(`MySQL: Erro no banco de dados:${err}`)
            return res.status(500).json({ error: "Erro interno" });
        }
    },

    async studentsData (req, res){
        const { ra } = req. params;
        if(!ra) return res.status(500).json({ error: "Dados insuficientes" });
        try {
            const data = await database.findByRa(ra);
            if(data.length === 0) return res.status(500).json({ error: "Nenhum dado encontrado ou aluno ja removido" });
            return res.status(200).json(data[0]);

        } catch (err) {
            console.log(`MySQL: Erro no banco de dados:${err}`)
            return res.status(500).json({ error: "Erro interno" });
        }

    }
}