const db = require('./db')

const CadastroVaga = db.sequelize.define('cadastroVaga', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    titulo: {
        type: db.Sequelize.STRING,
        allowNull:false,
        validate: { 
            notEmpty: {
                msg: "Esse campo não pode ser vazio"
            },
        }
    },
    requisitos: {
        type: db.Sequelize.STRING,
        allowNull:false
    },
    beneficios: {
        type: db.Sequelize.STRING,
        allowNull:false
    },
    salario: {
        type: db.Sequelize.STRING,
        allowNull:false
    },
    cidade: {
        type: db.Sequelize.STRING,
        allowNull:false
    }
})

//Criar a tabela
//CadastroVaga.sync({force: true})

module.exports = CadastroVaga;