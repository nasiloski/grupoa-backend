const mysql = require("mysql");
const mysqlConfig = require("../config/mysql");

const connection = mysql.createConnection(mysqlConfig);
connection.connect();

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
    update(nome, email, cpf){
        return new Promise ((resolve, reject) => {
            connection.query(`update alunos set nome='${nome}', email='${email}', cpf='${cpf}'`, function(error, result, fields) {
                if(error) reject(error);
                resolve(result);
            });
        });
    }
}