const mysql = require("mysql");
const mysqlConfig = require("../config/mysql");
const connection = mysql.createConnection(mysqlConfig);
connection.connect();

function createTables(){
    const sqlAlunos = "create table if not exists alunos( \n" +
                        "ra int(6) NOT NULL, \n" +
                        "nome varchar (60) NOT NULL, \n" +
                        "email varchar(50),\n" +
                        "cpf varchar(20) NOT NULL, \n" +
                        "primary key (ra) \n" +
                        ");";

    const sqlAdm = "create table if not exists admin_user( \n" +
                    "cd_usuario int(4) auto_increment, \n" +
                    "nome varchar(50) not null, \n" +
                    "email varchar(50), \n" +
                    "password varchar(50), \n" +
                    "primary key (cd_usuario) \n" +
                    ");"

    connection.query(sqlAlunos, function(error, result, fields){
        if(error) return console.log(error);
        console.log("Tabela de alunos criada com sucesso ou ja existente ");
    });
    connection.query(sqlAdm, function(error, result, fields){
        if(error) return console.log(error);
        console.log("Tabela de adms criada com sucesso ou ja existente");
    });
    connection.query('select * from admin_user where nome="admin"', function(error, result, fields){
        if(error) return console.log(error);
        const data = result[0];
        if(!data){
            connection.query(`insert into admin_user(cd_usuario, nome, email, password) values (null, 'admin', 'admin@localhost', 'admin')`, function(error, result, fields){
                if(error) return console.log(error);
                console.log("Usuário ADM Criado");
            });
        }
        
    });
}
createTables();

module.exports = {
    create (nome, email, ra, cpf) {
        return new Promise((resolve, reject) => {
            connection.query(`insert into alunos(ra, nome, email, cpf) values ('${ra}', '${nome}', '${email}', '${cpf}');`, function (error, result, fields) {               
                if (error) reject(error);
                resolve(result);
            });
        });      
    },

    findByRa(ra) {        
        return new Promise((resolve, reject) => {
            connection.query(`select * from alunos where ra=${ra}`, function(error, result, fields) {
                if (error) reject(error);
                resolve(result);
            });
        });
    },

    findAll(){
        return new Promise((resolve, reject) => {
            connection.query(`select * from alunos`, function(error, result, fields) {
                if(error) reject(error);
                resolve(result);
            });
        });
    },

    deleteByRa(ra){
        return new Promise ((resolve, reject) => {
            connection.query(`delete from alunos where ra=${ra}`, function(error, result, fields) {
                if(error) reject(error);
                resolve(result);
            });
        });
    },
    
    update(nome, email, cpf, ra){
        return new Promise ((resolve, reject) => {
            connection.query(`update alunos set nome='${nome}', email='${email}', cpf='${cpf}' where ra=${ra}`, function(error, result, fields) {
                if(error) reject(error);
                resolve(result);
            });
        });
    },
    
    findAdmin(name){
        return new Promise ((resolve, reject) => {
            connection.query(`select * from admin_user where nome='${name}'`, function(error, result, fields){
                if(error) reject(error);
                resolve(result);
            });
        });
    }
}