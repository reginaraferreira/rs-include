const db = require('./db')

const Cadastro = db.sequelize.define('cadastro', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: db.Sequelize.STRING,
        allowNull:false,
        validate: { 
            notEmpty: {
                msg: "Esse campo não pode ser vazio"
            },
        }
    },
    sobrenome: {
        type: db.Sequelize.STRING,
        allowNull:false
    },
    nascimento: {
        type: db.Sequelize.STRING
    },
    estado: {
        type: db.Sequelize.STRING,
        allowNull:false
    },
    cidade: {
        type: db.Sequelize.STRING,
        allowNull:false
    },
    senha: {
        type: db.Sequelize.STRING,
        allowNull:false
    },
    confsenha: {
        type: db.Sequelize.STRING,
        allowNull:false
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull:false
    },
    escolaridade: {
        type: db.Sequelize.STRING
    },
    instituicao:{
        type: db.Sequelize.STRING
    },
    empresa:{
        type: db.Sequelize.STRING
    },
    cargo:{
        type: db.Sequelize.STRING
    }

})

//Criar a tabela
//Cadastro.sync({force: true})

module.exports = Cadastro;