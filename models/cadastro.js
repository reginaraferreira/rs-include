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
        type: db.Sequelize.STRING
    },
    estado: {
        type: db.Sequelize.STRING
    },
    cidade: {
        type: db.Sequelize.STRING
    },
    senha: {
        type: db.Sequelize.STRING
    },
    confsenha: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    }

})

//Criar a tabela
//Cadastro.sync({force: true})

module.exports = Cadastro